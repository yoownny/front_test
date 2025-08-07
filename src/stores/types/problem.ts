import type { Problem } from "@/types/problem/problem";

export interface ProblemStoreType {
  problemId: number;
  title: string;
  content: string;
  answer: string;
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  genres: string[]; // 1~3개
  createdBy: string;
  problemType: 'EXISTING' | 'CUSTOM' | 'AI';
  joinAsHost: (problem: Problem) => void;
  joinAsPlayer: (problem: Problem) => void;
  resetProblem: () => void;
}
