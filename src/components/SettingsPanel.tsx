import React, { useRef } from 'react';
import { EditorSettings, Clip } from '../types';
import { Sliders, Clock, List, LayoutTemplate, Type, FileText, Smartphone, Monitor, Square, Cpu, Zap, Sparkles, ChevronRight, Maximize2, Crop, Globe, Check, AlignLeft } from 'lucide-react';
import { cn } from '../utils';

interface SettingsPanelProps {
  settings: EditorSettings;
  setSettings: React.Dispatch<React.SetStateAction<EditorSettings>> | ((s: any) => void);
  onExport: () => void;
  onExportAll: () => void;
  clips: Clip[];
  selectedClipId: string | null;
  onSelectClip: (id: string) => void;
  isServerUploading?: boolean;
  serverUploadProgress?: number;
  onSwitchToPreview?: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  setSettings,
  onExport,
  onExportAll,
  clips,
  selectedClipId,
  onSelectClip,
  isServerUploading = false,
  serverUploadProgress = 100,
  onSwitchToPreview,
}) => {
  const sideScrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollRafRef = useRef<number | null>(null);

  const handleFastScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(() => {
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0 && sideScrollIndicatorRef.current) {
        const pct = (el.scrollTop / total) * 100;
        sideScrollIndicatorRef.current.style.height = `${Math.min(100, Math.max(3, pct))}%`;
      }
    });
  };

  const activeClip = clips.find(c => c.id === selectedClipId) || clips[0];
  const currentTitleValue = settings.customTitle !== undefined ? settings.customTitle : '';
  const currentIndex = clips.findIndex(c => c.id === selectedClipId);

  const handleNextPart = () => {
    if (clips.length <= 1) return;
    const nextIdx = (currentIndex + 1) % clips.length;
    onSelectClip(clips[nextIdx].id);
  };

  const handlePrevPart = () => {
    if (clips.length <= 1) return;
    const prevIdx = (currentIndex - 1 + clips.length) % clips.length;
    onSelectClip(clips[prevIdx].id);
  };

  return (
    <div 
      onScroll={handleFastScroll}
      className="w-full lg:w-96 bg-zinc-950/95 border-t lg:border-t-0 lg:border-l border-zinc-800/80 flex flex-col h-full min-h-0 flex-1 overflow-y-auto custom-scrollbar shrink-0 backdrop-blur-xl relative overscroll-y-contain"
    >
      {/* Panel Header */}
      <div className="p-4 md:p-5 border-b border-zinc-800/80 flex items-center justify-between shrink-0 sticky top-0 bg-zinc-950/95 backdrop-blur z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">Studio Controls</h2>
        </div>

        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          GPU Accel
        </span>
      </div>
      
      <div className="p-4 md:p-5 space-y-6 flex-1 pb-44 md:pb-12">
        
        {/* Clip Length Selector */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Target Clip Length
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 30, label: '30s', sub: 'Short' },
              { value: 60, label: '60s', sub: 'Reels' },
              { value: 90, label: '90s', sub: 'TikTok' }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSettings({...settings, clipDuration: option.value})}
                className={cn(
                  "py-2.5 px-2 rounded-2xl border transition-all text-center cursor-pointer",
                  settings.clipDuration === option.value
                    ? "bg-indigo-600/15 border-indigo-500 text-white shadow-sm shadow-indigo-500/20"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                )}
              >
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-[10px] text-zinc-500">{option.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Video Parts Navigation */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <List className="w-3.5 h-3.5 text-cyan-400" />
              Video Parts ({clips.length})
            </label>

            {clips.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevPart}
                  className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded text-xs font-semibold border border-zinc-800 cursor-pointer"
                  title="Previous Part"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={handleNextPart}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                  title="Open Next Part"
                >
                  <span>Next Part</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Clickable Part Pills */}
          <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {clips.map((c, idx) => {
                const isSelected = c.id === selectedClipId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectClip(c.id)}
                    className={cn(
                      "py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer relative",
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30 font-bold ring-1 ring-indigo-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 font-medium"
                    )}
                  >
                    <div className="text-xs font-bold">Part {idx + 1}</div>
                    <div className="text-[10px] opacity-75">{Number(c.duration).toFixed(1)}s</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Custom Part / Series Tag Text Input (Optional) */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-indigo-400" />
              Series Tag Badge (Bottom Pill)
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={currentTitleValue}
              onChange={(e) => setSettings({ ...settings, customTitle: e.target.value })}
              placeholder={activeClip ? activeClip.title.toLowerCase() : "part 1"}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
            />
          </div>
          <p className="text-[10px] text-zinc-500">
            Leave blank to display "{activeClip ? activeClip.title.toLowerCase() : 'part 1'}" automatically.
          </p>
        </div>

        {/* Format Switcher */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-amber-400" />
            Video Aspect Ratio
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'shorts', label: '9:16', sub: 'Vertical', icon: Smartphone },
              { id: 'square', label: '1:1', sub: 'Square', icon: Square },
              { id: 'landscape', label: '16:9', sub: 'Cinema', icon: Monitor }
            ].map((f) => {
              const Icon = f.icon;
              const isSelected = settings.format === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSettings({...settings, format: f.id as any})}
                  className={cn(
                    "py-3 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer",
                    isSelected
                      ? "bg-indigo-600/15 border-indigo-500 text-white shadow-sm"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  )}
                >
                  <Icon className="w-4 h-4 mb-0.5" />
                  <span className="text-xs font-bold">{f.label}</span>
                  <span className="text-[10px] text-zinc-500">{f.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Framing (Crop vs No-Crop) */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              Video Framing (Crop vs Full Video)
            </span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSettings({ ...settings, videoFit: 'contain' })}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1",
                (settings.videoFit || 'contain') === 'contain'
                  ? "bg-emerald-500/15 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-400"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white"
              )}
            >
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Fit (No Crop)</span>
              </div>
              <span className="text-[10px] text-zinc-400">Shows full video, 0% cropped</span>
            </button>

            <button
              type="button"
              onClick={() => setSettings({ ...settings, videoFit: 'cover' })}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1",
                settings.videoFit === 'cover'
                  ? "bg-amber-500/15 border-amber-500 text-white shadow-sm ring-1 ring-amber-400"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white"
              )}
            >
              <div className="flex items-center gap-1.5">
                <Crop className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold">Fill (Crop 9:16)</span>
              </div>
              <span className="text-[10px] text-zinc-400">Fills vertical 9:16 screen</span>
            </button>
          </div>
        </div>

        {/* Subtitle Style Presets */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Subtitle Style Presets
            </label>
            <span className="text-[10px] text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/25 px-2 py-0.5 rounded-full">
              ✨ Auto Highlight
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { 
                id: 'hormozi', 
                name: 'Hormozi (100% Transparent)', 
                desc: 'Bada floating text, zero background box (100% transparent), glowing yellow word highlight',
                preview: 'bg-transparent text-[#FFE500] font-black uppercase text-xs tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]' 
              },
              { 
                id: 'minimal', 
                name: 'Black Box Highlight (Kala Background)', 
                desc: 'Piche solid black background box, maximum highlight & contrast on any video',
                preview: 'bg-black/95 border border-white/20 text-[#FFE500] font-black uppercase text-[11px] px-2.5 py-1 rounded-lg shadow-lg' 
              }
            ].map(style => {
              const isSelected = settings.captionStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSettings(prev => ({ ...prev, captionStyle: style.id as any }))}
                  className={cn(
                    "p-3 rounded-2xl border text-left flex flex-col gap-2 relative transition-all cursor-pointer",
                    isSelected
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500"
                      : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs font-bold", isSelected ? "text-white" : "text-zinc-300")}>
                      {style.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400" />
                    )}
                  </div>
                  
                  {/* Live Mini Preview Swatch */}
                  <div className="flex items-center">
                    <span className={style.preview}>ACTIVE WORD HIGHLIGHT</span>
                  </div>

                  <span className="text-[10px] text-zinc-500 leading-snug">{style.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caption Vertical Position Selector (Bottom / Middle) */}
        {settings.enableCaptions && (
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Caption Position (Vertical Alignment)
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold">
                {settings.captionPosition === 'middle' ? 'Center (50%)' : settings.captionPosition === 'lower' ? 'Mid-Low' : 'Bottom Line (Niche)'}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bottom', label: 'Bottom Line', sub: 'Niche Line (Clear)' },
                { id: 'lower', label: 'Mid-Low', sub: 'Slightly higher' },
                { id: 'middle', label: 'Center', sub: 'Center (50%)' }
              ].map(pos => {
                const isSelected = (settings.captionPosition || 'bottom') === pos.id;
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, captionPosition: pos.id as any }))}
                    className={cn(
                      "py-2 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5",
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-white font-bold shadow-sm ring-1 ring-indigo-500"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    )}
                  >
                    <span className="text-xs font-bold">{pos.label}</span>
                    <span className="text-[9px] text-zinc-500">{pos.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Caption Alignment & Flow (Side Se vs Center) */}
        {settings.enableCaptions && (
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-cyan-400" />
                Caption Flow (Side Se / Center)
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold">
                {settings.captionAlign === 'left' ? 'Side Se (Left-to-Right)' : 'Center (Beech Me)'}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'center', label: 'Center (Beech Me)', sub: 'Centered on video (Standard)' },
                { id: 'left', label: 'Side Se (Left)', sub: 'Starts from side' }
              ].map(align => {
                const isSelected = (settings.captionAlign || 'center') === align.id;
                return (
                  <button
                    key={align.id}
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, captionAlign: align.id as any }))}
                    className={cn(
                      "py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5",
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-500 text-white font-bold shadow-sm ring-1 ring-cyan-500"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    )}
                  >
                    <span className="text-xs font-bold">{align.label}</span>
                    <span className="text-[9px] text-zinc-500">{align.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Subtitle Language (Multi-Language Engine: Hindi -> Hinglish, Global & Local native) */}
        {settings.enableCaptions && (
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Subtitle Language (Multi-Language)
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold truncate max-w-[150px]">
                {settings.subtitleLanguage === 'hi'
                  ? '🇮🇳 Hindi → Hinglish'
                  : settings.subtitleLanguage === 'hi-in'
                  ? '🇮🇳 हिन्दी (Devanagari)'
                  : settings.subtitleLanguage === 'en'
                  ? '🇺🇸 English'
                  : settings.subtitleLanguage === 'ar'
                  ? '🇸🇦 Arabic / العربية'
                  : settings.subtitleLanguage === 'ur'
                  ? '🇵🇰 Urdu / اردو'
                  : settings.subtitleLanguage === 'es'
                  ? '🇪🇸 Spanish'
                  : settings.subtitleLanguage === 'fr'
                  ? '🇫🇷 French'
                  : settings.subtitleLanguage === 'de'
                  ? '🇩🇪 German'
                  : settings.subtitleLanguage === 'ru'
                  ? '🇷🇺 Russian'
                  : settings.subtitleLanguage === 'bn'
                  ? '🇧🇩 Bengali'
                  : settings.subtitleLanguage === 'ja'
                  ? '🇯🇵 Japanese'
                  : settings.subtitleLanguage === 'pt'
                  ? '🇧🇷 Portuguese'
                  : settings.subtitleLanguage === 'it'
                  ? '🇮🇹 Italian'
                  : settings.subtitleLanguage === 'tr'
                  ? '🇹🇷 Turkish'
                  : settings.subtitleLanguage === 'id'
                  ? '🇮🇩 Indonesian'
                  : settings.subtitleLanguage === 'zh'
                  ? '🇨🇳 Chinese'
                  : settings.subtitleLanguage === 'ko'
                  ? '🇰🇷 Korean'
                  : '🌐 Auto Global / Local'}
              </span>
            </label>
            
            <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {[
                { id: 'auto', label: 'Auto Detect', sub: 'Global / Local Auto', flag: '🌐' },
                { id: 'hi', label: 'Hindi → Hinglish', sub: 'Roman Script (AAJ HUM)', flag: '🇮🇳' },
                { id: 'hi-in', label: 'हिन्दी (Devanagari)', sub: 'Native Hindi (आज हम)', flag: '🇮🇳' },
                { id: 'en', label: 'English', sub: 'Global English (TODAY WE)', flag: '🇺🇸' },
                { id: 'ar', label: 'Arabic / العربية', sub: 'Native Script (اليوم سوف)', flag: '🇸🇦' },
                { id: 'ur', label: 'Urdu / اردو', sub: 'Native Script (آج ہم)', flag: '🇵🇰' },
                { id: 'es', label: 'Spanish / Español', sub: 'Native Local (HOY VAMOS)', flag: '🇪🇸' },
                { id: 'fr', label: 'French / Français', sub: 'Native Local (AUJOURD\'HUI)', flag: '🇫🇷' },
                { id: 'de', label: 'German / Deutsch', sub: 'Native Local (HEUTE PROBIEREN)', flag: '🇩🇪' },
                { id: 'ru', label: 'Russian / Русский', sub: 'Cyrillic Script (СЕГОДНЯ МЫ)', flag: '🇷🇺' },
                { id: 'bn', label: 'Bengali / বাংলা', sub: 'Native Script (আজ আমরা)', flag: '🇧🇩' },
                { id: 'ja', label: 'Japanese / 日本語', sub: 'Native Script (今日は)', flag: '🇯🇵' },
                { id: 'pt', label: 'Portuguese', sub: 'Native Local (HOJE VAMOS)', flag: '🇧🇷' },
                { id: 'it', label: 'Italian / Italiano', sub: 'Native Local (OGGI PROVEREMO)', flag: '🇮🇹' },
                { id: 'tr', label: 'Turkish / Türkçe', sub: 'Native Local (BUGÜN YENİ)', flag: '🇹🇷' },
                { id: 'id', label: 'Indonesian', sub: 'Bahasa (HARI INI)', flag: '🇮🇩' },
                { id: 'zh', label: 'Chinese / 中文', sub: 'Simplified (今天我们要)', flag: '🇨🇳' },
                { id: 'ko', label: 'Korean / 한국어', sub: 'Hangul (오늘 우리는)', flag: '🇰🇷' },
              ].map(lang => {
                const isSelected = (settings.subtitleLanguage || 'auto') === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setSettings({ ...settings, subtitleLanguage: lang.id })}
                    className={cn(
                      "w-full py-2 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group",
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-500/70 text-white font-bold shadow-sm ring-1 ring-cyan-500"
                        : "bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{lang.flag}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold leading-tight truncate text-white">{lang.label}</span>
                        <span className="text-[10px] text-zinc-400 truncate mt-0.5">{lang.sub}</span>
                      </div>
                    </div>
                    <div className="shrink-0 ml-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-zinc-500 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Active Language Preview & Switch Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/40 text-xs shadow-lg flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>भाषा एक्टिव (Active):</span>
                  <span className="text-white bg-cyan-500/20 px-2 py-0.5 rounded-md border border-cyan-500/30 uppercase text-[10px]">
                    {settings.subtitleLanguage || 'auto'}
                  </span>
                </div>
                {onSwitchToPreview && (
                  <button
                    type="button"
                    onClick={onSwitchToPreview}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-[11px] rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>🎬 वीडियो देखें</span>
                  </button>
                )}
              </div>
              <div className="p-2 rounded-xl bg-black/80 border border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-medium">लाइव प्रिव्यू:</span>
                <span className="text-xs font-black text-[#FFE600] tracking-wide text-right">
                  "{(() => {
                    const l = (settings.subtitleLanguage || 'auto').toLowerCase();
                    if (l === 'hi-in') return 'आज हम करेंगे कुछ नया';
                    if (l === 'en') return 'TODAY WE WILL TRY';
                    if (l === 'ar') return 'اليوم سوف نجرب';
                    if (l === 'ur') return 'آج ہم کریں گے کچھ';
                    if (l === 'es') return 'HOY VAMOS A PROBAR';
                    if (l === 'fr') return "AUJOURD'HUI NOUS TESTONS";
                    if (l === 'de') return 'HEUTE PROBIEREN WIR';
                    if (l === 'ru') return 'СЕГОДНЯ МЫ ПОПРОБУЕМ';
                    if (l === 'ja') return '今日は新しいことに';
                    if (l === 'bn') return 'আজ আমরা চেষ্টা করব';
                    if (l === 'pt') return 'HOJE VAMOS TENTAR';
                    return 'AAJ HUM KARENGE KUCH';
                  })()}"
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Studio Controls: Overlays & Captions Toggle */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            Studio Controls & Overlays
          </label>
          <div className="space-y-1.5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-2">
            
            {/* Generate Animated Captions Toggle (Default: ON) - Prominently Highlighted */}
            <div className={cn(
              "flex items-center justify-between p-2.5 rounded-xl transition-all",
              settings.enableCaptions
                ? "bg-amber-500/10 border border-amber-500/30 shadow-xs"
                : "bg-transparent"
            )}>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  Auto Captions & Subtitles
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-yellow-400 text-zinc-950 shadow-xs">
                    HIGHLIGHT
                  </span>
                </span>
                <span className="text-[10px] text-zinc-400">
                  {settings.enableCaptions ? 'Active Spoken Word Highlight ON' : 'Captions OFF'}
                </span>
                {settings.enableCaptions && (
                  <span className="text-[9px] text-amber-400/90 font-semibold mt-0.5">
                    🌐 Smart AI Subtitles: Auto-detects speech & synchronizes word highlights
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSettings({...settings, enableCaptions: !settings.enableCaptions})}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ml-2",
                  settings.enableCaptions ? "bg-amber-500" : "bg-zinc-700"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                  settings.enableCaptions ? "left-6" : "left-1"
                )} />
              </button>
            </div>

            {/* Part 1 Series Tag Toggle */}
            <div className="flex items-center justify-between p-2.5 border-t border-zinc-800/40">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <List className="w-3.5 h-3.5 text-amber-400" />
                  Part 1 Series Tag Badge
                </span>
                <span className="text-[10px] text-zinc-500">
                  {settings.titleSticker ? 'Part Tag ON (Shows Part 1, Part 2)' : 'Part Tag OFF'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSettings({...settings, titleSticker: !settings.titleSticker})}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  settings.titleSticker ? "bg-indigo-600" : "bg-zinc-700"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                  settings.titleSticker ? "left-6" : "left-1"
                )} />
              </button>
            </div>

            {/* Audio Waveform Bars Toggle */}
            <div className="flex items-center justify-between p-2.5 border-t border-zinc-800/40">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-300">Audio Waveform Bars</span>
                <span className="text-[10px] text-zinc-500">
                  {settings.audioWaveform ? 'Waveform ON' : 'Waveform OFF'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSettings({...settings, audioWaveform: !settings.audioWaveform})}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  settings.audioWaveform ? "bg-indigo-600" : "bg-zinc-700"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                  settings.audioWaveform ? "left-6" : "left-1"
                )} />
              </button>
            </div>

          </div>
        </div>

        {/* Render Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={onExportAll}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-black text-xs md:text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>🚀 Render All {clips.length > 1 ? `${clips.length} Parts` : ''} & Auto-Download</span>
          </button>
          <p className="text-[10px] text-zinc-500 text-center font-medium">
            Configure once — all parts render and download automatically!
          </p>

          {clips.length > 1 && (
            <button
              type="button"
              onClick={onExport}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold text-[11px] border border-zinc-800 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
            >
              <span>Render Single Preview Part Only</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
