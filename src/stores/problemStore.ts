import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Problem } from "@/types/problem/problem";

// 타입 재정의
export type Difficulty = "EASY" | "NORMAL" | "HARD";
export type ProblemType = "ORIGINAL" | "CUSTOM" | "AI";

// 문제 저장소 타입 정의
export interface ProblemStoreType {
  problemId: string;
  title: string;
  content: string;
  answer: string;
  difficulty: Difficulty;
  genres: string[];
  createdBy: string;
  problemType: ProblemType;

  joinAsHost: (problem: Problem) => void;
  joinAsPlayer: (problem: Problem) => void;
  resetProblem: () => void;
}

const useProblemStore = create<ProblemStoreType>()(
  devtools((set) => ({
    problemId: "",
    title: "",
    content: "",
    answer: "",
    difficulty: "NORMAL",
    genres: [],
    problemType: "ORIGINAL",

    joinAsHost: (problem: Problem) =>
      set(() => ({
        problemId: problem.problemId ?? "",
        title: problem.title ?? "",
        content: problem.content ?? "",
        answer: problem.answer ?? "",
        difficulty: (problem.difficulty ?? "NORMAL") as Difficulty,
        genres: problem.genres ?? [],
        problemType: (problem.problemType?.toUpperCase() ?? "ORIGINAL") as ProblemType,
      })),

    joinAsPlayer: (problem: Problem) =>
      set(() => ({
        problemId: problem.problemId ?? "",
        title: problem.title ?? "",
        content: problem.content ?? "",
        answer: "", // 참가자에겐 정답 미노출
        difficulty: (problem.difficulty ?? "NORMAL") as Difficulty,
        genres: problem.genres ?? [],
        problemType: (problem.problemType?.toUpperCase() ?? "ORIGINAL") as ProblemType,
      })),

    resetProblem: () =>
      set(() => ({
        problemId: "",
        title: "",
        content: "",
        answer: "",
        difficulty: "NORMAL",
        genres: [],
        problemType: "ORIGINAL",
      })),
  }))
);


export default useProblemStore;
