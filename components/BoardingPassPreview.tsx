import React from 'react';
import { BoardingPassData, StyleConfig, ThemeType, PatternType } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Plane, Info, Globe } from 'lucide-react';

interface BoardingPassPreviewProps {
  data: BoardingPassData;
  style: StyleConfig;
}

export const BoardingPassPreview: React.FC<BoardingPassPreviewProps> = ({ data, style }) => {
  const { theme, primaryColor, accentColor, bgColor, width, logoUrl, bgPattern } = style;

  // Helper to get formatted date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '---';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
    } catch { return dateStr; }
  };

  // Helper styles based on theme
  const getThemeStyles = () => {
    switch (theme) {
      case ThemeType.Dark:
        return {
          container: 'bg-slate-900 text-white',
          secondaryText: 'text-slate-400',
          border: 'border-slate-700',
          divider: 'border-slate-800',
          glass: 'bg-white/10 backdrop-blur-md',
          patternColor: '#ffffff',
          patternOpacity: 0.03,
        };
      case ThemeType.Modern:
        return {
          container: 'bg-white text-slate-900',
          secondaryText: 'text-slate-500',
          border: 'border-slate-200',
          divider: 'border-slate-100',
          glass: 'bg-slate-50',
          patternColor: '#000000',
          patternOpacity: 0.03,
        };
      case ThemeType.Retro:
        return {
          container: 'bg-[#fdfbf7] text-[#3e392e]',
          secondaryText: 'text-[#8b8575]',
          border: 'border-[#e3dac9]',
          divider: 'border-[#e3dac9]',
          glass: 'bg-[#f4f1ea]',
          patternColor: '#3e392e',
          patternOpacity: 0.05,
        };
      case ThemeType.Classic:
      default:
        return {
          container: 'bg-white text-black',
          secondaryText: 'text-gray-600',
          border: 'border-gray-300',
          divider: 'border-gray-200',
          glass: 'bg-gray-50',
          patternColor: '#000000',
          patternOpacity: 0.05,
        };
    }
  };

  const ts = getThemeStyles();
  
  // Custom CSS variable style for dynamic colors
  const dynamicStyle = {
    '--primary': primaryColor,
    '--accent': accentColor,
  } as React.CSSProperties;
  
  // Determine actual background style (custom override or theme default)
  const containerStyle = bgColor && bgColor !== '#ffffff' && bgColor !== '#000000' 
      ? { backgroundColor: bgColor, color: theme === ThemeType.Dark ? 'white' : 'inherit' }
      : {};

  const renderPattern = () => {
    if (!bgPattern || bgPattern === PatternType.None) return null;

    const commonStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: ts.patternOpacity,
    };

    switch (bgPattern) {
        case PatternType.Dots:
            return (
                <div style={{
                    ...commonStyle,
                    backgroundImage: `radial-gradient(${ts.patternColor} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                }} />
            );
        case PatternType.Lines:
             return (
                <div style={{
                    ...commonStyle,
                    backgroundImage: `repeating-linear-gradient(45deg, ${ts.patternColor} 0, ${ts.patternColor} 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '10px 10px',
                }} />
             );
        case PatternType.Grid:
            return (
                <div style={{
                    ...commonStyle,
                    backgroundImage: `linear-gradient(${ts.patternColor} 1px, transparent 1px), linear-gradient(90deg, ${ts.patternColor} 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                }} />
            );
        case PatternType.Globe:
            return (
                <div style={{
                    ...commonStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: ts.patternOpacity * 1.5, // Slightly more visible
                    overflow: 'hidden'
                }}>
                    <Globe size={400} strokeWidth={0.5} color={ts.patternColor} className="transform rotate-12" />
                </div>
            );
        default:
            return null;
    }
  };

  return (
    <div 
      className="mx-auto filter drop-shadow-xl transition-all duration-300"
      style={{ ...dynamicStyle, width: `${width}%` }}
    >
      {/* Main Boarding Pass Container */}
      <div 
        className={`flex flex-col md:flex-row rounded-3xl overflow-hidden relative ${ts.container} ${theme === ThemeType.Modern ? 'shadow-2xl' : 'border-2 ' + ts.border}`}
        style={containerStyle}
      >
        {/* Pattern Overlay */}
        {renderPattern()}
        
        {/* Left Section (Main) */}
        <div className="flex-grow p-6 md:p-8 relative z-10">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
               {logoUrl ? (
                 <div className="w-12 h-12 flex items-center justify-center">
                    <img src={logoUrl} alt="Airline Logo" className="w-full h-full object-contain" />
                 </div>
               ) : (
                 <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <Plane className="text-white w-6 h-6 transform -rotate-45" />
                 </div>
               )}
               <span className="font-bold text-xl tracking-wide uppercase" style={{ color: primaryColor }}>{data.airline}</span>
            </div>
            <div className={`text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider ${ts.glass}`} style={{ color: accentColor }}>
              {data.classType} Class
            </div>
          </div>

          {/* Route Info */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className={`text-4xl md:text-6xl font-black tracking-tight mb-1`}>{data.originCode}</div>
              <div className={`text-sm uppercase tracking-widest ${ts.secondaryText}`}>{data.originCity}</div>
            </div>

            <div className="flex-1 px-8 flex flex-col items-center">
              <Plane className={`w-8 h-8 transform rotate-90 mb-2`} style={{ color: primaryColor }} />
              <div className={`w-full h-0.5 relative ${ts.secondaryText} bg-current opacity-20`}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-current w-2 h-2 rounded-full opacity-100"></div>
              </div>
              <div className={`mt-2 text-xs font-mono ${ts.secondaryText}`}>{data.flightNumber}</div>
            </div>

            <div className="text-right">
              <div className={`text-4xl md:text-6xl font-black tracking-tight mb-1`}>{data.destinationCode}</div>
              <div className={`text-sm uppercase tracking-widest ${ts.secondaryText}`}>{data.destinationCity}</div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div>
              <div className={`text-xs uppercase tracking-wider mb-1 ${ts.secondaryText}`}>Date</div>
              <div className="font-semibold font-mono">{formatDate(data.date)}</div>
            </div>
            <div>
              <div className={`text-xs uppercase tracking-wider mb-1 ${ts.secondaryText}`}>Time</div>
              <div className="font-semibold font-mono">{data.time}</div>
            </div>
            <div>
              <div className={`text-xs uppercase tracking-wider mb-1 ${ts.secondaryText}`}>Gate</div>
              <div className="font-bold text-xl" style={{ color: accentColor }}>{data.gate}</div>
            </div>
            <div>
              <div className={`text-xs uppercase tracking-wider mb-1 ${ts.secondaryText}`}>Boarding</div>
              <div className="font-semibold font-mono">{data.time}</div>
            </div>
          </div>
          
          {/* Custom Notes Section (New) */}
          {data.notes && (
             <div className={`mb-6 p-3 rounded-lg border ${ts.border} bg-opacity-10 ${ts.glass}`}>
                <div className="flex items-start gap-2">
                   <Info className={`w-4 h-4 mt-0.5 ${ts.secondaryText}`} />
                   <p className={`text-sm italic leading-relaxed ${ts.secondaryText}`}>{data.notes}</p>
                </div>
             </div>
          )}

          {/* Passenger Name Bottom */}
          <div className="mt-auto pt-6 border-t border-dashed" style={{ borderColor: theme === ThemeType.Dark ? '#334155' : '#e2e8f0' }}>
             <div className="flex justify-between items-end">
                <div>
                   <div className={`text-xs uppercase tracking-wider mb-1 ${ts.secondaryText}`}>Passenger</div>
                   <div className="font-medium text-lg uppercase tracking-wide">{data.passengerName}</div>
                </div>
                <div className="text-right">
                   <div className={`text-xs uppercase tracking-wider mb-1 ${ts.secondaryText}`}>Group</div>
                   <div className="font-bold text-2xl" style={{ color: primaryColor }}>{data.group}</div>
                </div>
             </div>
          </div>

          {/* Decorative Circles for Tear-off effect */}
          <div className={`absolute -right-4 top-1/2 w-8 h-8 rounded-full z-10`} style={{ backgroundColor: theme === ThemeType.Dark ? '#0f172a' : '#f9fafb' }}></div>
        </div>

        {/* Vertical Divider (Dashed Line) */}
        <div className={`relative hidden md:block w-0 border-l-2 border-dashed my-4`} style={{ borderColor: theme === ThemeType.Dark ? '#334155' : '#cbd5e1' }}></div>

        {/* Right Section (Stub) */}
        <div className={`w-full md:w-80 p-6 flex flex-col justify-between relative z-10 ${theme === ThemeType.Modern ? 'bg-opacity-50' : ''} ${ts.glass}`}>
           {/* Tear off circles for Stub */}
           <div className={`absolute -left-4 top-1/2 w-8 h-8 rounded-full z-10 hidden md:block`} style={{ backgroundColor: theme === ThemeType.Dark ? '#0f172a' : '#f9fafb' }}></div>
           
           <div className="space-y-6">
              <div className="flex justify-between items-start">
                 <div className="font-bold uppercase tracking-widest">{data.airline}</div>
                 <div className="font-mono font-bold" style={{ color: primaryColor }}>{data.classType.substring(0,3).toUpperCase()}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <div className={`text-[10px] uppercase ${ts.secondaryText}`}>Flight</div>
                    <div className="font-bold font-mono">{data.flightNumber}</div>
                 </div>
                 <div>
                    <div className={`text-[10px] uppercase ${ts.secondaryText}`}>Date</div>
                    <div className="font-bold font-mono">{formatDate(data.date).split(',')[0]}</div>
                 </div>
              </div>

              <div className="flex justify-between items-center">
                 <div className="text-2xl font-black">{data.originCode}</div>
                 <Plane className="w-4 h-4 text-slate-400" />
                 <div className="text-2xl font-black">{data.destinationCode}</div>
              </div>

              <div className="bg-white p-3 rounded-xl flex justify-center items-center shadow-sm">
                 <QRCodeSVG 
                    value={`${data.flightNumber}-${data.date}-${data.passengerName}`} 
                    size={120}
                    fgColor={theme === ThemeType.Dark ? '#000' : primaryColor}
                 />
              </div>
           </div>
           
           <div className="mt-6 text-center">
              <div className={`text-[10px] uppercase mb-1 ${ts.secondaryText}`}>Seat</div>
              <div className="text-4xl font-black" style={{ color: accentColor }}>{data.seat}</div>
           </div>
        </div>
      </div>
    </div>
  );
};