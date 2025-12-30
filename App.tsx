import React, { useState, useRef } from 'react';
import { BoardingPassData, StyleConfig, INITIAL_DATA, INITIAL_STYLE } from './types';
import { BoardingPassForm } from './components/BoardingPassForm';
import { BoardingPassPreview } from './components/BoardingPassPreview';
import { StyleControls } from './components/StyleControls';
import { Printer, Download, Plane } from 'lucide-react';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [data, setData] = useState<BoardingPassData>(INITIAL_DATA);
  const [style, setStyle] = useState<StyleConfig>(INITIAL_STYLE);
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `boarding-pass-${data.passengerName.replace(/\s+/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[420px] bg-slate-50 border-r border-slate-200 h-auto md:h-screen overflow-y-auto no-print shadow-xl z-20">
        <div className="p-6">
          <header className="mb-8 flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Plane className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">SkyPass Creator</h1>
              <p className="text-xs text-slate-500 font-medium">Design & Generate Boarding Passes</p>
            </div>
          </header>

          <StyleControls config={style} onChange={setStyle} />
          
          <BoardingPassForm data={data} onChange={setData} />
          
          <div className="mt-8 flex gap-3 pb-8">
            <button 
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-slate-200"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-medium transition-all"
            >
              <Download className="w-4 h-4" />
              Save PNG
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-slate-100/50 relative overflow-hidden flex flex-col">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}></div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-4 md:p-12 print:p-0">
          <div ref={previewRef} className="w-full max-w-5xl transform transition-all duration-500 ease-in-out hover:scale-[1.01]" id="preview-container">
            <BoardingPassPreview data={data} style={style} />
          </div>
        </div>
        
        <div className="p-4 text-center text-xs text-slate-400 no-print">
          Preview updates in real-time. Use the sidebar to customize.
        </div>
      </div>
    </div>
  );
};

export default App;