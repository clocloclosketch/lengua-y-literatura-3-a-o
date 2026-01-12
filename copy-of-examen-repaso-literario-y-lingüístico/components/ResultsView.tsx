
import React from 'react';
import { ExamState } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TOPIC_COLORS } from '../constants';

interface ResultsViewProps {
  state: ExamState;
  onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ state, onRestart }) => {
  const percentage = Math.round((state.score / state.questions.length) * 100);
  
  const getTopicStats = () => {
    const stats: Record<string, { correct: number, total: number }> = {};
    state.questions.forEach((q) => {
      if (!stats[q.topic]) stats[q.topic] = { correct: 0, total: 0 };
      stats[q.topic].total += 1;
      if (state.answers[q.id] === q.correctAnswer) {
        stats[q.topic].correct += 1;
      }
    });
    return Object.entries(stats).map(([name, data]) => ({
      name,
      p: Math.round((data.correct / data.total) * 100)
    }));
  };

  const chartData = getTopicStats();

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-slate-100 text-slate-900 text-4xl font-black mb-4 border-8 border-slate-50">
            {percentage}%
          </div>
          <h1 className="text-3xl font-bold text-slate-900">¡Examen Finalizado!</h1>
          <p className="text-slate-500">Has acertado {state.score} de {state.questions.length} preguntas.</p>
        </div>

        <div className="h-64 mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="p" radius={[8, 8, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#0f172a" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-2">Porcentaje de acierto por bloque temático</p>
        </div>

        <div className="space-y-6 text-left border-t border-slate-100 pt-8">
          <h3 className="font-bold text-xl text-slate-800">Revisión de respuestas:</h3>
          {state.questions.map((q, idx) => {
            const userAnswer = state.answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={idx} className={`p-6 rounded-2xl border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${TOPIC_COLORS[q.topic]}`}>
                    {q.topic}
                  </span>
                  <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                    {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                  </span>
                </div>
                <p className="font-bold text-slate-800 mb-2">{q.text}</p>
                <div className="text-sm space-y-1">
                  <p className="text-slate-600">Tu respuesta: <span className="font-semibold">{q.options[userAnswer] || 'Sin responder'}</span></p>
                  {!isCorrect && <p className="text-emerald-700">Respuesta correcta: <span className="font-semibold">{q.options[q.correctAnswer]}</span></p>}
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg text-sm text-slate-700 italic border border-slate-200">
                  <span className="font-bold">Explicación:</span> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
        >
          Volver a Empezar
        </button>
      </div>
    </div>
  );
};
