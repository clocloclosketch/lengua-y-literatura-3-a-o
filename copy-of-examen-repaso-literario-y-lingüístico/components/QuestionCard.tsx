
import React from 'react';
import { Question } from '../types';
import { TOPIC_COLORS } from '../constants';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  selectedOption: number | undefined;
  onSelect: (optionIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  selectedOption,
  onSelect
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${TOPIC_COLORS[question.topic]}`}>
            {question.topic}
          </span>
          <span className="text-slate-400 font-medium text-sm">
            Pregunta {index + 1} de {total}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center gap-4 ${
                selectedOption === idx
                ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-md translate-x-1'
                : 'border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                selectedOption === idx ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
