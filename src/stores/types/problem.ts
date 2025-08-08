import type { SelectedProblem } from "@/types/problem/problem";

export interface ProblemStoreType {
  problemId: number;
  title: string;
  content: string;
  answer: string;
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  genres: string[]; // 1~3개
  createdBy: string;
  problemType: 'EXISTING' | 'CUSTOM' | 'AI';
  joinAsHost: (problem: SelectedProblem) => void;
  joinAsPlayer: (problem: SelectedProblem) => void;
  resetProblem: () => void;
  endGame: (problem: SelectedProblem) => void,
}
