
import React, { useState, useCallback } from 'react';
import { Topic, ExamState, Question } from './types';
import { generateExamQuestions } from './services/geminiService';
import { TopicSelector } from './components/TopicSelector';
import { QuestionCard } from './components/QuestionCard';
import { ResultsView } from './components/ResultsView';

const App: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>(Object.values(Topic));
  const [isLoading, setIsLoading] = useState(false);
  const [examState, setExamState] = useState<ExamState | null>(null);

  const toggleTopic = (topic: Topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const startExam = async () => {
    setIsLoading(true);
    try {
      const questions = await generateExamQuestions(selectedTopics);
      setExamState({
        questions,
        currentQuestionIndex: 0,
        answers: {},
        isFinished: false,
        score: 0
      });
    } catch (error) {
      alert("Hubo un error al generar las preguntas. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (!examState) return;
    const currentQuestion = examState.questions[examState.currentQuestionIndex];
    
    setExamState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: optionIndex }
      };
    });
  };

  const nextQuestion = () => {
    if (!examState) return;
    if (examState.currentQuestionIndex < examState.questions.length - 1) {
      setExamState(prev => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 } : null);
    } else {
      finishExam();
    }
  };

  const prevQuestion = () => {
    if (!examState) return;
    if (examState.currentQuestionIndex > 0) {
      setExamState(prev => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 } : null);
    }
  };

  const finishExam = () => {
    if (!examState) return;
    let score = 0;
    examState.questions.forEach(q => {
      if (examState.answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setExamState(prev => prev ? { ...prev, isFinished: true, score } : null);
  };

  const restart = () => {
    setExamState(null);
  };

  if (examState?.isFinished) {
    return <ResultsView state={examState} onRestart={restart} />;
  }

  if (examState) {
    const currentQuestion = examState.questions[examState.currentQuestionIndex];
    const isLast = examState.currentQuestionIndex === examState.questions.length - 1;
    const hasAnswered = examState.answers[currentQuestion.id] !== undefined;

    return (
      <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">
        <div className="w-full max-w-2xl mb-8 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
           <button onClick={restart} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Abandonar
           </button>
           <div className="h-2 flex-1 mx-8 bg-slate-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-slate-900 transition-all duration-300" 
               style={{ width: `${((examState.currentQuestionIndex + 1) / examState.questions.length) * 100}%` }}
             ></div>
           </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          index={examState.currentQuestionIndex}
          total={examState.questions.length}
          selectedOption={examState.answers[currentQuestion.id]}
          onSelect={handleAnswer}
        />

        <div className="w-full max-w-2xl mt-10 flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={examState.currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              examState.currentQuestionIndex === 0 
              ? 'bg-transparent text-slate-300 pointer-events-none' 
              : 'bg-white text-slate-700 shadow hover:bg-slate-50'
            }`}
          >
            Anterior
          </button>
          <button
            onClick={nextQuestion}
            disabled={!hasAnswered}
            className={`px-10 py-3 rounded-xl font-bold transition-all shadow-lg ${
              hasAnswered
              ? 'bg-slate-900 text-white hover:bg-slate-800 transform hover:translate-y-[-2px] active:translate-y-0'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Ver Resultados' : 'Siguiente Pregunta'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <TopicSelector
        selectedTopics={selectedTopics}
        onToggleTopic={toggleTopic}
        onStart={startExam}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
