
export enum Topic {
  Fuenteovejuna = 'Fuenteovejuna',
  Lazarillo = 'Lazarillo de Tormes',
  EspanolEsconde = 'Lo que el español esconde',
  Gramatica = 'Gramática Española',
  EstudiosLiterarios = 'Estudios Literarios'
}

export interface Question {
  id: string;
  topic: Topic;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  isFinished: boolean;
  score: number;
}
