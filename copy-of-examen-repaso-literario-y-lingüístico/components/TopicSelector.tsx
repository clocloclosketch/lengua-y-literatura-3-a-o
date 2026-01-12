
import React from 'react';
import { Topic } from '../types';
import { TOPIC_COLORS } from '../constants';

interface TopicSelectorProps {
  selectedTopics: Topic[];
  onToggleTopic: (topic: Topic) => void;
  onStart: () => void;
  isLoading: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  selectedTopics, 
  onToggleTopic, 
  onStart,
  isLoading 
}) => {
  const allTopics = Object.values(Topic);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Repaso de Temario Completo</h1>
        <p className="text-slate-600">Selecciona los bloques que quieres incluir en tu examen de repaso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {allTopics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          const colorClass = TOPIC_COLORS[topic];
          
          return (
            <button
              key={topic}
              onClick={() => onToggleTopic(topic)}
              className={`p-6 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-40 ${
                isSelected 
                ? `${colorClass} border-current shadow-lg scale-[1.02]` 
                : 'bg-white border-slate-200 text-slate-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
              }`}
            >
              <div className="font-semibold text-lg">{topic}</div>
              <div className="text-sm font-medium">
                {isSelected ? '✓ Seleccionado' : '+ Añadir al repaso'}
              </div>
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-8 flex justify-center">
        <button
          onClick={onStart}
          disabled={selectedTopics.length === 0 || isLoading}
          className={`px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all ${
            selectedTopics.length > 0 && !isLoading
            ? 'bg-slate-900 text-white hover:bg-slate-800 transform hover:scale-105 active:scale-95'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Examen...
            </span>
          ) : 'Empezar Examen Personalizado'}
        </button>
      </div>
    </div>
  );
};
