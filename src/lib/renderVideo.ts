import { Clip, EditorSettings } from '../types';
import { translateSubtitlesInstant } from '../utils/instantTranslation';
import { DEMO_PRELOADED_SUBTITLES } from '../data/demoSubtitles';

export const renderVideoClip = async (
  clip: Clip,
  serverVideoPath: string,
  settings: EditorSettings,
  onProgress: (progress: number) => void,
  jobIdParam: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Starting FAST SERVER-SIDE Render via FFmpeg using JSON payload...");
      
      let currentProgress = 6;
      onProgress(currentProgress); 

      const clipDur = clip.duration || (clip.endTime && clip.startTime ? clip.endTime - clip.startTime : 30) || 30;
      // Realistic render time estimate based on clip duration (ultrafast encoder renders ~1.5x-3x realtime)
      const estSeconds = Math.max(8, Math.min(65, clipDur * 0.65));
      const startTimeMs = Date.now();

      const progressTimer = setInterval(() => {
        const elapsedSec = (Date.now() - startTimeMs) / 1000;
        const progressRatio = Math.min(1, elapsedSec / estSeconds);

        if (progressRatio < 1) {
          // Smooth progressive curve reaching ~92%
          const target = 6 + 86 * Math.sin(progressRatio * (Math.PI / 2));
          currentProgress = Math.max(currentProgress, Math.min(92, Math.round(target)));
        } else {
          // If server takes longer than expected, NEVER FREEZE OR STALL AT 95%!
          // Smoothly advance toward 99%: 93, 94, 95, 96, 97, 98, 98.5...
          if (currentProgress < 99) {
            currentProgress += (99.2 - currentProgress) * 0.05;
            currentProgress = Math.min(99, Math.round(currentProgress * 10) / 10);
          }
        }
        onProgress(Math.floor(currentProgress));
      }, 350);

      const targetLang = (settings.subtitleLanguage || 'auto').toLowerCase();
      const isDemo = Boolean(
        serverVideoPath &&
        !serverVideoPath.includes('uploads') &&
        !serverVideoPath.includes('chunk-') &&
        (serverVideoPath.includes('official-demo.mp4') || serverVideoPath.includes('demo-sample.mp4'))
      );

      // Ensure subtitles are populated with authentic language track
      let effectiveSubtitles = isDemo
        ? (DEMO_PRELOADED_SUBTITLES[targetLang] || DEMO_PRELOADED_SUBTITLES.hi)
        : (clip.subtitles && clip.subtitles.length > 0 ? clip.subtitles : []);

      // If clip subtitles not yet ready, fetch real Groq Whisper speech transcription directly
      if (settings.enableCaptions && effectiveSubtitles.length === 0) {
        if (isDemo) {
          effectiveSubtitles = DEMO_PRELOADED_SUBTITLES[targetLang] || DEMO_PRELOADED_SUBTITLES.hi;
        } else if (serverVideoPath) {
          try {
            const transRes = await fetch('/api/groq-transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                videoPath: serverVideoPath,
                startTime: clip.startTime || 0,
                duration: clipDur,
                language: targetLang
              })
            });
            const transData = await transRes.json();
            if (transData && Array.isArray(transData.subtitles) && transData.subtitles.length > 0) {
              effectiveSubtitles = transData.subtitles;
              clip.subtitles = transData.subtitles;
              clip.subtitleLanguage = targetLang;
            }
          } catch (e) {
            console.warn("Real transcription fetch during render notice:", e);
          }
        }
      }

      // If target language is specified and not auto, ensure translated subtitles
      if (settings.enableCaptions && effectiveSubtitles.length > 0 && targetLang !== 'auto' && !isDemo) {
        try {
          const transRes = await fetch('/api/translate-subtitles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subtitles: effectiveSubtitles,
              targetLanguage: targetLang
            })
          });
          const transData = await transRes.json();
          if (transData && Array.isArray(transData.subtitles) && transData.subtitles.length > 0) {
            effectiveSubtitles = transData.subtitles;
          }
        } catch (_) {}
      }

      const payload = {
        videoPath: serverVideoPath,
        startTime: clip.startTime,
        duration: clip.duration,
        title: settings.customTitle?.trim() || clip.title,
        titleSticker: !!settings.titleSticker,
        enableCaptions: !!settings.enableCaptions,
        captionStyle: settings.captionStyle || 'hormozi',
        captionPosition: settings.captionPosition || 'bottom',
        captionAlign: settings.captionAlign || 'center',
        videoFit: settings.videoFit || 'contain',
        language: settings.subtitleLanguage || 'auto',
        subtitles: effectiveSubtitles
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/trim', true);
      xhr.responseType = 'blob'; 
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = 180000; 

      // Download progress tracking: smoothly transitions 94% -> 99%
      xhr.onprogress = (e) => {
        if (e.lengthComputable && e.total > 0) {
          const dlPercent = e.loaded / e.total;
          currentProgress = Math.max(currentProgress, 94 + Math.round(dlPercent * 5));
          onProgress(Math.min(99, Math.floor(currentProgress)));
        }
      };

      xhr.onload = () => {
        clearInterval(progressTimer);
        if (xhr.status === 200) {
          onProgress(100);
          const finalUrl = URL.createObjectURL(xhr.response);
          resolve(finalUrl);
        } else {
          // If response is a JSON error, parse it safely
          if (xhr.response && xhr.response.type && xhr.response.type.includes('application/json')) {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const errData = JSON.parse(reader.result as string);
                reject(new Error(errData.error || `Server Error: ${xhr.statusText || 'Render failed'}`));
              } catch(e) {
                reject(new Error(`Server Error: ${xhr.statusText || 'Render failed'}`));
              }
            };
            reader.onerror = () => reject(new Error(`Server Error: ${xhr.statusText || 'Render failed'}`));
            reader.readAsText(xhr.response);
          } else {
            reject(new Error(`Server Error: ${xhr.statusText || 'Render failed'}`));
          }
        }
      };

      xhr.onerror = () => {
        clearInterval(progressTimer);
        reject(new Error('Network error during video render. Please check connection.'));
      };
      
      xhr.ontimeout = () => {
        clearInterval(progressTimer);
        reject(new Error('Render request timed out. Please try again.'));
      };

      xhr.send(JSON.stringify(payload));
    } catch (error) {
      console.error("renderVideoClip error:", error);
      reject(error);
    }
  });
};
