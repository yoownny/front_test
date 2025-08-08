import type { SelectedProblem } from "@/types/problem/problem";
import type { ProblemStoreType } from "./types";
import { create } from "zustand";

function applyProblem(problem: SelectedProblem, isHost: boolean) {
  return {
    problemId: problem.problemId,
    title: problem.title,
    content: problem.content,
    answer: isHost ? problem.answer : "",
    difficulty: problem.difficulty,
    genres: problem.genres,
    createdBy: problem.createdBy,
    problemType: problem.problemType,
  };
}

const useProblemStore = create<ProblemStoreType>()((set) => ({
  problemId: -1,
  title: "",
  content: "",
  answer: "",
  difficulty: "NORMAL",
  genres: [],
  createdBy: "",
  problemType: "EXISTING",

  joinAsHost: (problem) => set(() => applyProblem(problem, true)),
  joinAsPlayer: (problem) => set(() => applyProblem(problem, false)),

  resetProblem: () =>
    set(() => ({
      problemId: -1,
      title: "",
      content: "",
      answer: "",
      difficulty: "NORMAL",
      genres: [],
      createdBy: "",
      problemType: "EXISTING",
    })),

  endGame: (problem) => set(() => applyProblem(problem, true)),
}));

export default useProblemStore;
