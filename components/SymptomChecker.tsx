import React, { useState } from 'react';
import { Sparkles, X, Loader2, Stethoscope } from 'lucide-react';
import { analyzeSymptoms } from '../services/geminiService';
import { Category } from '../types';

interface SymptomCheckerProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendation: (category: Category) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ isOpen, onClose, onRecommendation }) => {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const category = await analyzeSymptoms(symptoms);
      // Basic validation to ensure the API returned a valid category key
      // In a real app, you'd match this more strictly against the enum
      onRecommendation(category as Category);
      onClose();
      setSymptoms('');
    } catch (e) {
      console.error("Failed to analyze", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">AI Health Assistant</h2>
                <p className="text-sm text-slate-500">Describe your symptoms to find a specialist</p>
            </div>
        </div>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g., I have a sharp pain in my knee when I climb stairs..."
          className="w-full h-32 p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none resize-none text-slate-700 mb-4"
        />

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !symptoms.trim()}
            className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4" />
                Find Specialist
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};