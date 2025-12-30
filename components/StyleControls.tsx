import React, { useRef } from 'react';
import { StyleConfig, ThemeType, PatternType } from '../types';
import { Palette, Layout, MoveHorizontal, Upload, X, Grid, Globe, Grip, Minus } from 'lucide-react';

interface StyleControlsProps {
  config: StyleConfig;
  onChange: (config: StyleConfig) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleColorChange = (key: keyof StyleConfig, value: string) => {
    onChange({ ...config, [key]: value });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, width: parseInt(e.target.value) });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...config, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    onChange({ ...config, logoUrl: undefined });
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const patterns = [
    { type: PatternType.None, label: 'None', icon: <X className="w-4 h-4" /> },
    { type: PatternType.Dots, label: 'Dots', icon: <Grip className="w-4 h-4" /> },
    { type: PatternType.Lines, label: 'Lines', icon: <Minus className="w-4 h-4 transform -rotate-45" /> },
    { type: PatternType.Grid, label: 'Grid', icon: <Grid className="w-4 h-4" /> },
    { type: PatternType.Globe, label: 'World', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
        <Palette className="w-4 h-4 text-slate-500" />
        Appearance
      </h3>

      <div className="space-y-5">
        {/* Theme Selection */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2">Theme Preset</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(ThemeType).map((theme) => (
              <button
                key={theme}
                onClick={() => onChange({ ...config, theme })}
                className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                  config.theme === theme
                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Selection */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2">Background Pattern</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {patterns.map((p) => (
              <button
                key={p.type}
                onClick={() => onChange({ ...config, bgPattern: p.type })}
                className={`flex flex-col items-center justify-center min-w-[60px] p-2 rounded-lg border transition-all gap-1 ${
                  config.bgPattern === p.type
                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
                title={p.label}
              >
                {p.icon}
                <span className="text-[10px] font-medium">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2">Airline Logo</label>
          {config.logoUrl ? (
             <div className="flex items-center gap-3 p-2 border border-slate-200 rounded-lg bg-slate-50">
                <div className="w-10 h-10 bg-white rounded-md border border-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-xs text-slate-500 truncate">Custom Logo</div>
                <button 
                  onClick={clearLogo}
                  className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                  title="Remove Logo"
                >
                    <X className="w-4 h-4" />
                </button>
             </div>
          ) : (
            <label className="flex items-center justify-center w-full h-12 px-4 transition bg-white border-2 border-slate-200 border-dashed rounded-lg appearance-none cursor-pointer hover:border-blue-400 hover:bg-blue-50 focus:outline-none group">
                <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600">Upload Logo</span>
                </div>
                <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleLogoUpload} 
                />
            </label>
          )}
        </div>

        {/* Colors */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Primary</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-full h-8 rounded-md cursor-pointer border border-slate-200 p-0.5"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Accent</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="w-full h-8 rounded-md cursor-pointer border border-slate-200 p-0.5"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.bgColor}
                onChange={(e) => handleColorChange('bgColor', e.target.value)}
                className="w-full h-8 rounded-md cursor-pointer border border-slate-200 p-0.5"
                title="Custom Card Background (Skin)"
              />
            </div>
          </div>
        </div>

        {/* Width/Ratio Control */}
        <div>
           <label className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
              <span className="flex items-center gap-1"><MoveHorizontal className="w-3 h-3" /> Card Width Ratio</span>
              <span>{config.width}%</span>
           </label>
           <input
             type="range"
             min="60"
             max="120"
             value={config.width}
             onChange={handleWidthChange}
             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
           />
        </div>
      </div>
    </div>
  );
};