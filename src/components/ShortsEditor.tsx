import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Clip, EditorSettings } from '../types';
import { Smartphone, Eye, EyeOff, ChevronRight, ChevronLeft, Crop, Maximize2, Play, Pause, Sparkles, Globe } from 'lucide-react';
import { DEMO_PRELOADED_SUBTITLES } from '../data/demoSubtitles';
import { translateSubtitlesInstant } from '../utils/instantTranslation';

interface ShortsEditorProps {
  clip: Clip | null;
  settings: EditorSettings;
  setSettings?: (s: EditorSettings) => void;
  videoUrl: string | null;
  clips?: Clip[];
  onSelectClip?: (id: string) => void;
  serverPath?: string | null;
  onUpdateClipSubtitles?: (clipId: string, subtitles: any[], lang?: string) => void;
}

export function parseTimeToSeconds(val: any): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  if (typeof val === 'string') {
    const s = val.trim();
    if (!isNaN(Number(s))) return Number(s);
    const parts = s.replace(',', '.').split(':');
    if (parts.length === 3) {
      return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    }
    if (parts.length === 2) {
      return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
    }
    const parsed = parseFloat(s);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export const ShortsEditor: React.FC<ShortsEditorProps> = ({ 
  clip, 
  settings, 
  setSettings,
  videoUrl,
  clips = [],
  onSelectClip,
  serverPath,
  onUpdateClipSubtitles
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFetchingSubtitles, setIsFetchingSubtitles] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastLanguageRef = useRef<string>(settings.subtitleLanguage || 'auto');

  const isDemoSample = useMemo(() => {
    if (serverPath && (serverPath.includes('uploads') || serverPath.includes('chunk-'))) return false;
    if (videoUrl && videoUrl.startsWith('blob:')) return false;
    if (serverPath && (serverPath.includes('official-demo.mp4') || serverPath.includes('demo-sample.mp4'))) return true;
    if (videoUrl && (videoUrl.includes('official-demo.mp4') || videoUrl.includes('demo-sample.mp4'))) return true;
    return false;
  }, [serverPath, videoUrl]);

  // High-speed subtitle loading & live multi-language switching
  useEffect(() => {
    if (!clip) return;
    const currentLang = (settings.subtitleLanguage || 'auto').toLowerCase();
    const clipLang = (clip.subtitleLanguage || '').toLowerCase();
    const isLangChanged = lastLanguageRef.current !== currentLang || (clipLang && clipLang !== currentLang);
    lastLanguageRef.current = currentLang;

    let isMounted = true;

    // 1. For demo video: Instant 0ms switch to authentic preloaded subtitles in the selected language
    if (isDemoSample) {
      const demoSubs = DEMO_PRELOADED_SUBTITLES[currentLang] || DEMO_PRELOADED_SUBTITLES.hi;
      if (onUpdateClipSubtitles) {
        onUpdateClipSubtitles(clip.id, demoSubs, currentLang);
      }
      clip.subtitles = demoSubs;
      clip.subtitleLanguage = currentLang;
      return;
    }

    // 2. For user-uploaded video:
    // If clip already has subtitles and user switched language: Instant 0ms shift + background AI translation
    if (clip.subtitles && clip.subtitles.length > 0 && isLangChanged) {
      // Step A: Instant 0ms shift
      const instantSubs = translateSubtitlesInstant(clip.subtitles, currentLang);
      if (onUpdateClipSubtitles) {
        onUpdateClipSubtitles(clip.id, instantSubs, currentLang);
      }
      clip.subtitles = instantSubs;
      clip.subtitleLanguage = currentLang;

      // Step B: In parallel, fetch AI refinement
      setIsTranslating(true);
      fetch('/api/translate-subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subtitles: clip.subtitles,
          targetLanguage: currentLang
        })
      })
        .then(res => res.json())
        .then(data => {
          if (!isMounted) return;
          setIsTranslating(false);
          if (data && data.subtitles && Array.isArray(data.subtitles) && data.subtitles.length > 0) {
            if (onUpdateClipSubtitles) {
              onUpdateClipSubtitles(clip.id, data.subtitles, currentLang);
            } else {
              clip.subtitles = data.subtitles;
              clip.subtitleLanguage = currentLang;
            }
          }
        })
        .catch(err => {
          if (isMounted) setIsTranslating(false);
          console.warn('Translate subtitles error:', err);
        });
      return;
    }

    // If clip already has subtitles and language hasn't changed, nothing to do
    if (clip.subtitles && clip.subtitles.length > 0 && !isLangChanged) {
      return;
    }

    // If clip has no subtitles yet: fetch real Groq Whisper speech-to-text transcription
    setIsFetchingSubtitles(true);
    const targetVideoPath = serverPath || (videoUrl && !videoUrl.startsWith('blob:') ? videoUrl : '');
    if (!targetVideoPath) {
      setIsFetchingSubtitles(false);
      return;
    }

    fetch('/api/groq-transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoPath: targetVideoPath,
        startTime: clip.startTime || 0,
        duration: clip.duration || (clip.endTime - clip.startTime) || 60,
        language: currentLang
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        setIsFetchingSubtitles(false);
        if (data && data.subtitles && Array.isArray(data.subtitles) && data.subtitles.length > 0) {
          if (onUpdateClipSubtitles) {
            onUpdateClipSubtitles(clip.id, data.subtitles, currentLang);
          } else {
            clip.subtitles = data.subtitles;
            clip.subtitleLanguage = currentLang;
          }
        }
      })
      .catch(err => {
        if (isMounted) setIsFetchingSubtitles(false);
        console.warn('Subtitles fetch error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [clip?.id, serverPath, settings.subtitleLanguage, isDemoSample, onUpdateClipSubtitles]);

  // 60 FPS requestAnimationFrame loop for ultra-precise, frame-accurate audio & caption synchronization
  useEffect(() => {
    const loop = () => {
      if (videoRef.current && !videoRef.current.paused) {
        const curr = videoRef.current.currentTime;
        setCurrentTime(curr);
        if (bgVideoRef.current && Math.abs(bgVideoRef.current.currentTime - curr) > 0.15) {
          bgVideoRef.current.currentTime = curr;
        }
        if (clip && clip.endTime && curr >= clip.endTime) {
          videoRef.current.currentTime = clip.startTime || 0;
          setCurrentTime(clip.startTime || 0);
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [clip?.startTime, clip?.endTime]);

  const isCoverFit = settings.videoFit === 'cover';

  const handleLoadedMetadata = () => {
    if (videoRef.current && clip) {
      try {
        videoRef.current.currentTime = clip.startTime || 0;
        setCurrentTime(clip.startTime || 0);
        const p = videoRef.current.play();
        if (p !== undefined) {
          p.then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false);
          });
        }
      } catch (e) {
        console.warn('Metadata loaded seek error:', e);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current && clip) {
      if (videoRef.current.readyState >= 1) {
        try {
          videoRef.current.currentTime = clip.startTime || 0;
          setCurrentTime(clip.startTime || 0);
          const p = videoRef.current.play();
          if (p !== undefined) {
            p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          }
        } catch (e) {
          console.warn('Play error:', e);
        }
      }
    }
  }, [clip?.id, clip?.startTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current && clip && clip.endTime) {
      const curr = videoRef.current.currentTime;
      setCurrentTime(curr);
      if (bgVideoRef.current && Math.abs(bgVideoRef.current.currentTime - curr) > 0.2) {
        bgVideoRef.current.currentTime = curr;
      }
      if (curr >= clip.endTime) {
        videoRef.current.currentTime = clip.startTime;
        setCurrentTime(clip.startTime);
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!clip || !videoUrl) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 bg-black p-8 gap-3 min-h-[300px]">
        <Smartphone className="w-12 h-12 text-zinc-700 stroke-[1.5]" />
        <p className="text-sm font-medium">Select a clip to open in editor</p>
      </div>
    );
  }

  const currentIndex = clips.findIndex(c => c.id === clip.id);
  const currentPartNum = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalParts = clips.length > 0 ? clips.length : 1;

  const handleNextPart = () => {
    if (clips.length <= 1 || !onSelectClip) return;
    const nextIdx = (currentIndex + 1) % clips.length;
    onSelectClip(clips[nextIdx].id);
  };

  const handlePrevPart = () => {
    if (clips.length <= 1 || !onSelectClip) return;
    const prevIdx = (currentIndex - 1 + clips.length) % clips.length;
    onSelectClip(clips[prevIdx].id);
  };

  const toggleFitMode = () => {
    if (!setSettings) return;
    setSettings({
      ...settings,
      videoFit: isCoverFit ? 'contain' : 'cover'
    });
  };

  // Automatically show "part 1" on preview or custom title if user typed one
  const displayTitle = (settings.customTitle !== undefined && settings.customTitle.trim() !== '')
    ? settings.customTitle.trim()
    : 'part 1';

  // Time relative to clip start
  const relTime = Math.max(0, currentTime - (clip.startTime || 0));

  // Multi-language contiguous phrases for instant live language switching and exact reel cadence
  const selectedLang = (settings.subtitleLanguage || 'auto').toLowerCase();

  const effectiveSubtitles = useMemo(() => {
    // 1. Demo video: Instant authentic preloaded subtitles in the user's selected language
    if (isDemoSample) {
      return DEMO_PRELOADED_SUBTITLES[selectedLang] || DEMO_PRELOADED_SUBTITLES.hi || [];
    }

    // 2. User-uploaded video: Real transcribed speech attached to the clip
    if (clip?.subtitles && clip.subtitles.length > 0) {
      const currentClipLang = (clip.subtitleLanguage || '').toLowerCase();
      const hasNonLatinScript = clip.subtitles.some(s => /[\u0900-\u097F\u0600-\u06FF\u0980-\u09FF\u0A00-\u0A7F]/.test(s.text || ''));

      // If user chose Hinglish ('hi') and subtitles have Devanagari / Urdu / etc:
      // Instantly convert to Roman uppercase Hinglish so it never takes another script!
      if (selectedLang === 'hi' && hasNonLatinScript) {
        return translateSubtitlesInstant(clip.subtitles, 'hi');
      }

      if (selectedLang !== 'auto' && currentClipLang !== selectedLang) {
        return translateSubtitlesInstant(clip.subtitles, selectedLang);
      }
      return clip.subtitles;
    }

    // 3. User video without speech or while transcribing: clean empty array (zero fake dummy phrases)
    return [];
  }, [clip?.subtitles, clip?.subtitleLanguage, isDemoSample, selectedLang]);

  // Determine whether subtitle timestamps are absolute to video start or relative to clip start
  const isSubtitleAbsolute = useMemo(() => {
    if (!effectiveSubtitles || effectiveSubtitles.length === 0 || !clip?.startTime || clip.startTime <= 1) return false;
    const firstStart = parseTimeToSeconds(effectiveSubtitles[0].startTime ?? (effectiveSubtitles[0] as any).start);
    return firstStart >= clip.startTime - 1;
  }, [effectiveSubtitles, clip?.startTime]);

  // Direct synchronized playback timescale strictly matching the active subtitle format
  const syncPlaybackTime = isSubtitleAbsolute ? currentTime : Math.max(0, currentTime - (clip?.startTime || 0));

  // Strict audio-matching: only return a subtitle if current playback time is inside its actual speech time
  const activeSubtitle = useMemo(() => {
    if (!effectiveSubtitles || effectiveSubtitles.length === 0) return null;
    
    // Direct match: only active when audio is actually speaking this phrase
    for (let i = 0; i < effectiveSubtitles.length; i++) {
      const s: any = effectiveSubtitles[i];
      const start = parseTimeToSeconds(s.startTime !== undefined ? s.startTime : s.start);
      const end = parseTimeToSeconds(s.endTime !== undefined ? s.endTime : s.end);
      if (syncPlaybackTime >= start && syncPlaybackTime <= end) {
        return s;
      }
    }

    return null;
  }, [effectiveSubtitles, syncPlaybackTime]);

  // Parse words array with sanitized boundaries
  const subtitleWords = useMemo(() => {
    if (!activeSubtitle) return [];
    const segStart = parseTimeToSeconds(activeSubtitle.startTime !== undefined ? activeSubtitle.startTime : (activeSubtitle as any).start || 0);
    const segEnd = parseTimeToSeconds(activeSubtitle.endTime !== undefined ? activeSubtitle.endTime : (activeSubtitle as any).end || (segStart + 1.4));

    if (activeSubtitle.words && Array.isArray(activeSubtitle.words) && activeSubtitle.words.length > 0) {
      return activeSubtitle.words.map((w: any, idx: number, arr: any[]) => {
        let wStart = parseTimeToSeconds(w.start);
        let wEnd = parseTimeToSeconds(w.end);
        if (isNaN(wStart) || wStart < segStart) wStart = segStart + (idx * (segEnd - segStart)) / arr.length;
        if (isNaN(wEnd) || wEnd <= wStart) wEnd = segStart + ((idx + 1) * (segEnd - segStart)) / arr.length;
        const cleanW = String(w.word || w.text || '').replace(/[।|/\\—–_]+/g, '').trim().toUpperCase();
        return {
          word: cleanW,
          start: Number(wStart.toFixed(2)),
          end: Number(wEnd.toFixed(2))
        };
      }).filter((w: any) => w.word.length > 0);
    }

    const textStr = (activeSubtitle.text || '')
      .replace(/[|।/\\—–_\-·•*|]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!textStr) return [];
    const parts = textStr.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return [];
    const totalDuration = Math.max(0.4, segEnd - segStart);
    const perWord = totalDuration / parts.length;
    return parts.map((w: string, idx: number) => ({
      word: w
        .replace(/^[|।\-_/\\:;.,~`'"!?#@*()\[\]{}<>\s]+/g, '')
        .replace(/[|।\-_/\\:;.,~`'"!?#@*()\[\]{}<>\s]+$/g, '')
        .trim().toUpperCase(),
      start: Number((segStart + idx * perWord).toFixed(2)),
      end: Number((segStart + (idx + 1) * perWord).toFixed(2))
    })).filter((w: any) => w.word.length > 0);
  }, [activeSubtitle]);

  // Audio-Synchronized Display Window:
  // "Jahan audio ho wahi show kare, aage ka nahi"
  // ONLY show words whose audio has already started! Future words are strictly hidden until audio reaches them.
  // Strictly 1-2 words on screen so captions NEVER wrap or jump to an upper line!
  const displayWordsWindow = useMemo(() => {
    if (!activeSubtitle || !subtitleWords || subtitleWords.length === 0) return [];

    // Filter strictly to words whose audio time has been reached
    const spoken = subtitleWords.filter(w => w.start <= syncPlaybackTime + 0.05);
    if (spoken.length === 0) return [];

    // Keep compact 1-2 punchy words so it stays strictly on one lower line without ever jumping to upper line
    return spoken.slice(Math.max(0, spoken.length - 2));
  }, [activeSubtitle, subtitleWords, syncPlaybackTime]);

  // Caption Vertical Positioning:
  // Placed down strictly in the niche (bottom) line, safely clear of face and above the series tag badge
  const getCaptionPositionStyle = (): React.CSSProperties => {
    switch (settings.captionPosition) {
      case 'middle':
        return { top: '50%', transform: 'translateY(-50%)' };
      case 'lower':
        return { bottom: settings.titleSticker ? '13%' : '9%' };
      case 'bottom':
      default:
        return { bottom: settings.titleSticker ? '7.5%' : '4.5%' };
    }
  };

  // Styles for the bottom Part 1 / Series Tag badge - 100% Transparent (No Black background)
  const getBadgeStyles = () => {
    return 'text-white bg-transparent font-black px-2 py-0.5 border-none shadow-none';
  };

  // Instant language switch handler for 0ms live language switching
  const handleQuickLanguageSwitch = (targetLang: string) => {
    if (setSettings) {
      setSettings({
        ...settings,
        subtitleLanguage: targetLang
      });
    }
    const currentLang = targetLang.toLowerCase();
    if (isDemoSample) {
      const demoSubs = DEMO_PRELOADED_SUBTITLES[currentLang] || (currentLang === 'ar' ? DEMO_PRELOADED_SUBTITLES.ar : DEMO_PRELOADED_SUBTITLES.hi);
      if (onUpdateClipSubtitles && clip) {
        onUpdateClipSubtitles(clip.id, demoSubs, currentLang);
      } else if (clip) {
        clip.subtitles = demoSubs;
        clip.subtitleLanguage = currentLang;
      }
    } else if (clip?.subtitles && clip.subtitles.length > 0) {
      const instantSubs = translateSubtitlesInstant(clip.subtitles, currentLang);
      if (onUpdateClipSubtitles) {
        onUpdateClipSubtitles(clip.id, instantSubs, currentLang);
      } else {
        clip.subtitles = instantSubs;
        clip.subtitleLanguage = currentLang;
      }

      // Live Groq AI translation for accurate multi-lingual subtitles
      setIsTranslating(true);
      fetch('/api/translate-subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subtitles: clip.subtitles,
          targetLanguage: currentLang
        })
      })
        .then(res => res.json())
        .then(data => {
          setIsTranslating(false);
          if (data && data.subtitles && Array.isArray(data.subtitles) && data.subtitles.length > 0) {
            if (onUpdateClipSubtitles && clip) {
              onUpdateClipSubtitles(clip.id, data.subtitles, currentLang);
            } else if (clip) {
              clip.subtitles = data.subtitles;
              clip.subtitleLanguage = currentLang;
            }
          }
        })
        .catch(() => setIsTranslating(false));
    } else if (serverPath || videoUrl) {
      const targetVideoPath = serverPath || (videoUrl && !videoUrl.startsWith('blob:') ? videoUrl : '');
      if (targetVideoPath) {
        setIsFetchingSubtitles(true);
        fetch('/api/groq-transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoPath: targetVideoPath,
            startTime: clip?.startTime || 0,
            duration: clip?.duration || (clip?.endTime - clip?.startTime) || 60,
            language: currentLang
          })
        })
          .then(res => res.json())
          .then(data => {
            setIsFetchingSubtitles(false);
            if (data && data.subtitles && Array.isArray(data.subtitles) && data.subtitles.length > 0) {
              if (onUpdateClipSubtitles && clip) {
                onUpdateClipSubtitles(clip.id, data.subtitles, currentLang);
              } else if (clip) {
                clip.subtitles = data.subtitles;
                clip.subtitleLanguage = currentLang;
              }
            }
          })
          .catch(() => setIsFetchingSubtitles(false));
      }
    }
  };

  return (
    <div className="flex-1 bg-black p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center relative overflow-hidden w-full">
      
      {/* Top Studio Toolbar */}
      <div className="w-full max-w-sm mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
            9:16 Preview
          </span>
          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            🌐 {settings.subtitleLanguage === 'hi-in' ? 'हिन्दी' : settings.subtitleLanguage === 'hi' ? 'Hinglish' : settings.subtitleLanguage || 'auto'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Caption Style (Hormozi 100% Transparent vs Black Box) Quick Switch */}
          <button
            type="button"
            onClick={() => {
              if (setSettings) {
                setSettings({
                  ...settings,
                  captionStyle: settings.captionStyle === 'minimal' ? 'hormozi' : 'minimal'
                });
              }
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              settings.captionStyle === 'hormozi'
                ? 'bg-yellow-400/15 border-yellow-400/40 text-yellow-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title={settings.captionStyle === 'hormozi' ? "Hormozi (100% Transparent)" : "Black Box Highlight"}
          >
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>{settings.captionStyle === 'hormozi' ? 'Transparent' : 'Box'}</span>
          </button>

          {/* Video Fit (No Crop vs Crop 9:16) Toggle */}
          <button
            type="button"
            onClick={toggleFitMode}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              !isCoverFit
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title={!isCoverFit ? "Full Video Visible (No Crop)" : "9:16 Fill (Cropped)"}
          >
            {!isCoverFit ? (
              <>
                <Maximize2 className="w-3 h-3 text-emerald-400" />
                <span className="hidden xs:inline">No Crop</span>
                <span className="xs:hidden">Fit</span>
              </>
            ) : (
              <>
                <Crop className="w-3 h-3 text-amber-400" />
                <span>Fill 9:16</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowSafeZones(!showSafeZones)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              showSafeZones
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Toggle TikTok / Reels Safe Zones"
          >
            {showSafeZones ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span className="hidden xs:inline">Safe</span>
          </button>
        </div>
      </div>

      {/* 9:16 Video Frame with Responsive Height for Mobile, Tablet & PC */}
      <div className="relative aspect-[9/16] w-auto h-full max-h-[50vh] sm:max-h-[62vh] md:max-h-[74vh] lg:max-h-[82vh] bg-zinc-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-800 flex flex-col justify-between select-none group">
        
        {/* Background Ambient Blur (Active during Fit mode so no black void is felt) */}
        {!isCoverFit && (
          <video
            ref={bgVideoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
            muted
            playsInline
          />
        )}

        {/* Video Element - Fit mode shows 100% video without cropping! Clean click-to-play with zero black browser controls bar */}
        <video
          ref={videoRef}
          src={videoUrl}
          className={`w-full h-full relative z-10 transition-all cursor-pointer ${
            isCoverFit ? 'object-cover' : 'object-contain'
          }`}
          playsInline
          preload="auto"
          onClick={togglePlay}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Quick Play/Pause overlay if paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 z-15 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer"
            title="Click to Play Video"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 active:scale-95 transition-transform">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
            </div>
          </button>
        )}

        {/* TikTok / Reels Safe Zone Overlay Guides */}
        {showSafeZones && (
          <div className="absolute inset-0 pointer-events-none border-2 border-indigo-500/40 rounded-2xl sm:rounded-3xl z-20 flex flex-col justify-between p-3 sm:p-4">
            <div className="w-full border-b border-dashed border-indigo-500/40 pb-1 text-[9px] sm:text-[10px] font-mono text-indigo-400/80 text-center">
              Top Title Safe Zone (Avoid App Header)
            </div>
            
            <div className="flex justify-between items-center w-full">
              <span className="text-[9px] font-mono text-indigo-400/60 rotate-90">Left Safe</span>
              <div className="text-[9px] font-mono text-indigo-400/60 text-right pr-1">
                Right Safe Zone
              </div>
            </div>

            <div className="w-full border-t border-dashed border-indigo-500/40 pt-1 text-[9px] sm:text-[10px] font-mono text-indigo-400/80 text-center">
              Bottom Series Tag Safe Zone
            </div>
          </div>
        )}

        {/* If fetching AI captions or translating for video, show sleek pulsating indicator */}
        {settings.enableCaptions && (isFetchingSubtitles || isTranslating) && !activeSubtitle && (
          <div 
            style={getCaptionPositionStyle()}
            className="absolute left-0 right-0 flex items-center justify-center pointer-events-none z-20 px-3 sm:px-5 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{isTranslating ? '🌐 Translating Captions...' : '✨ Syncing AI Captions...'}</span>
            </div>
          </div>
        )}

        {/* Dynamic Alex Hormozi Animated Captions Overlay (Zero side clipping, rock-solid baseline, audio-synchronized) */}
        {settings.enableCaptions && activeSubtitle && displayWordsWindow && displayWordsWindow.length > 0 && (() => {
          const currentLang = (settings.subtitleLanguage || '').toLowerCase();
          const isRtl = ['ar', 'ur'].includes(currentLang) || /[\u0600-\u06FF]/.test(activeSubtitle.text);
          const isNativeScript = isRtl || ['hi-in', 'ja', 'zh', 'ko', 'bn'].includes(currentLang) || /[\u0900-\u097F\u0980-\u09FF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(activeSubtitle.text);
          const isAlignLeft = settings.captionAlign === 'left';

          return (
            <div 
              style={getCaptionPositionStyle()}
              className={`absolute left-0 right-0 flex items-center ${isAlignLeft ? 'justify-start text-left px-6 sm:px-10' : 'justify-center text-center px-4 sm:px-6'} pointer-events-none z-20 select-none`}
            >
              {settings.captionStyle === 'minimal' ? (
                /* Minimal / Black Box Highlight: Solid black background box for maximum contrast & pop */
                <div 
                  key={`box-${activeSubtitle.id || activeSubtitle.startTime || activeSubtitle.text}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className={`inline-flex flex-nowrap whitespace-nowrap items-center ${isAlignLeft ? 'justify-start text-left' : 'justify-center text-center mx-auto'} gap-2 max-w-[95%] bg-black/95 border border-white/20 px-3.5 sm:px-5 py-1.5 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-md select-none`}
                >
                  {displayWordsWindow.map((w, idx) => {
                    const isActive = (syncPlaybackTime >= w.start && syncPlaybackTime <= w.end) || 
                                     (idx === displayWordsWindow.length - 1 && syncPlaybackTime >= w.start);
                    const highlightColor = '#FFE600';
                    const cleanW = isNativeScript
                      ? w.word.trim()
                      : w.word.replace(/^[|।\-_/\\:;.,~`'"!?#@*()\[\]{}<>\s]+/g, '').replace(/[|।\-_/\\:;.,~`'"!?#@*()\[\]{}<>\s]+$/g, '');
                    
                    return (
                      <span
                        key={`box-${w.start}-${cleanW}-${idx}`}
                        className={`text-base sm:text-lg md:text-xl font-black select-none inline-block whitespace-nowrap transition-transform duration-75 opacity-100 ${
                          isActive ? 'scale-110 z-10' : 'scale-100 text-white'
                        } ${isNativeScript ? 'font-sans' : 'uppercase tracking-wide'}`}
                        style={{
                          color: isActive ? highlightColor : '#FFFFFF',
                          fontFamily: isRtl ? "'Noto Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif" : undefined,
                          letterSpacing: isNativeScript ? 'normal' : undefined,
                          textShadow: isActive 
                            ? '0 0 14px rgba(255, 230, 0, 0.95), 0 2px 4px rgba(0,0,0,0.95), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' 
                            : '0 2px 4px rgba(0,0,0,0.9), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                        }}
                      >
                        {cleanW}
                      </span>
                    );
                  })}
                </div>
              ) : (
                /* Hormozi: 100% Transparent, Bold Kinetic Typography - Crisp Solid White + Vibrant Yellow / Neon Highlight */
                <div 
                  key={`hormozi-${activeSubtitle.id || activeSubtitle.startTime || activeSubtitle.text}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className={`flex flex-nowrap whitespace-nowrap items-center ${isAlignLeft ? 'justify-start text-left' : 'justify-center text-center mx-auto'} gap-2 max-w-[95%] px-1 bg-transparent p-0 border-none shadow-none select-none`}
                  style={{ background: 'transparent', backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}
                >
                  {displayWordsWindow.map((w, idx) => {
                    const isActive = (syncPlaybackTime >= w.start && syncPlaybackTime <= w.end) || 
                                     (idx === displayWordsWindow.length - 1 && syncPlaybackTime >= w.start);
                    const highlightColor = settings.captionStyle === 'neon' ? '#39FF14' : '#FFE600';
                    const cleanW = isNativeScript
                      ? w.word.trim()
                      : w.word.replace(/^[|।\-_/\\:;.,~`'"!?#@*()\[\]{}<>\s]+/g, '').replace(/[|।\-_/\\:;.,~`'"!?#@*()\[\]{}<>\s]+$/g, '');
                    
                    return (
                      <span
                        key={`hormozi-${w.start}-${cleanW}-${idx}`}
                        className={`text-lg sm:text-xl md:text-2xl font-black select-none bg-transparent inline-block whitespace-nowrap transition-transform duration-75 opacity-100 ${
                          isActive ? 'scale-110 z-10' : 'scale-100'
                        } ${isNativeScript ? 'font-sans' : 'uppercase tracking-wider'}`}
                        style={{
                          color: isActive ? highlightColor : '#FFFFFF',
                          background: 'transparent',
                          backgroundColor: 'transparent',
                          WebkitTextStroke: 'none',
                          fontFamily: isRtl ? "'Noto Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif" : undefined,
                          letterSpacing: isNativeScript ? 'normal' : undefined,
                          textShadow: isActive 
                            ? (settings.captionStyle === 'neon'
                                ? '0 0 18px rgba(57, 255, 20, 0.95), 0 2px 4px rgba(0,0,0,0.95), -2.5px -2.5px 0 #000, 2.5px -2.5px 0 #000, -2.5px 2.5px 0 #000, 2.5px 2.5px 0 #000'
                                : '0 0 18px rgba(255, 230, 0, 0.95), 0 2px 4px rgba(0,0,0,0.95), -2.5px -2.5px 0 #000, 2.5px -2.5px 0 #000, -2.5px 2.5px 0 #000, 2.5px 2.5px 0 #000')
                            : '0 2px 5px rgba(0, 0, 0, 0.95), -2.5px -2.5px 0 #000, 2.5px -2.5px 0 #000, -2.5px 2.5px 0 #000, 2.5px 2.5px 0 #000'
                        }}
                      >
                        {cleanW}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* Part 1 / Series Tag Badge (Bottom Center, Zero black shadow) */}
        {settings.titleSticker && displayTitle !== '' && (
          <div className="absolute bottom-2.5 sm:bottom-3 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-20 px-3">
            <span 
              className="inline-block text-white font-black uppercase tracking-wider text-[10px] sm:text-[11px] bg-transparent p-0 border-none shadow-none select-none"
              style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                WebkitTextStroke: 'none',
                textShadow: 'none'
              }}
            >
              {displayTitle}
            </span>

            {/* Audio Waveform simulation if enabled */}
            {settings.audioWaveform && (
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {[3, 8, 6, 12, 14, 10, 6, 4, 8, 12, 6, 3].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-indigo-400/80 rounded-full animate-pulse"
                    style={{ height: `${h}px`, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
