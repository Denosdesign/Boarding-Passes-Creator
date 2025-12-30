import React, { useState } from 'react';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';
import { parseFlightInfo } from '../services/geminiService';
import { BoardingPassData } from '../types';

interface AIParserProps {
  onDataParsed: (data: Partial<BoardingPassData>) => void;
}

export const AIParser: React.FC<AIParserProps> = ({ onDataParsed }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await parseFlightInfo(input);
      onDataParsed(data);
    } catch (err) {
      setError("Failed to parse flight info. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-purple-100 rounded-lg">
          <Wand2 className="w-4 h-4 text-purple-600" />
        </div>
        <h3 className="font-semibold text-slate-800">AI Auto-Fill</h3>
      </div>
      
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Flight CX888 from Hong Kong to Vancouver on Nov 25th for Mr. Chan, Seat 11A..."
          className="w-full text-sm p-3 pr-12 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[80px] resize-none transition-all"
        />
        <button
          onClick={handleParse}
          disabled={loading || !input.trim()}
          className="absolute bottom-3 right-3 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-md transition-colors shadow-sm"
          title="Generate Boarding Pass"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
};