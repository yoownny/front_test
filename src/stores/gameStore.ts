// 게임방의 룸 상태 관리
import type { Interaction } from "@/types/game";
import type { ProblemBrief } from "@/types/problem";
import type { User } from "@/types/user";
import { create } from "zustand";

interface GameStoreType {
  problemInfo: ProblemBrief | null;
  currentPlayers: User[];
  isHost: boolean;
  currentTurnPlayerId: number | null;
  currentQuestion: Interaction | null;
  gameHistory: Interaction[];
  currentTimer: number;
  nextInteractionId: number;

  gameStart: (problem: ProblemBrief, playerList: User[], userId: number) => void;
  addInteraction: (type: "question" | "answer", player: string, content: string,) => void;
  putReply: (targetId: number, replyContent: string) => void;
  turnOver: () => void;
  syncTimer: (remainingTime: number) => void;
  gameOver: () => void;
}

const useGameStore = create<GameStoreType>()((set) => ({
  // Initial State
  problemInfo: null,
  currentPlayers: [],
  isHost: false,
  currentTurnPlayerId: null,
  currentQuestion: null,
  gameHistory: [],
  currentTimer: 0,
  nextInteractionId: 0,

  // 게임 시작 State Logic
  gameStart: (problem: ProblemBrief, playerList: User[], userId: number) => set(() => ({
    problemInfo: problem,
    currentPlayers: playerList,
    isHost: playerList.find((player) => player.id === userId)?.isHost ?? false,
  })),

  // 참가자 질문 및 답변 State Logic
  addInteraction: (type: "question" | "answer", player: string, content: string) => set((state) => {
    const newInteraction: Interaction = {
      id: state.nextInteractionId,
      type,
      player,
      content,
      status: "PENDING",
    };

    return {
      gameHistory: [...state.gameHistory, newInteraction],
      currentQuestion: type === "question" ? newInteraction : state.currentQuestion,
      nextInteractionId: state.nextInteractionId + 1,
    };
  }),

  // 방장 (질문 및 답변) 응답 State Logic
  putReply: (targetId: number, replyContent: string) => set((state) => ({
    gameHistory: state.gameHistory.map((Interaction) =>
      Interaction.id === targetId ? { ...Interaction, reply: replyContent } : Interaction
    )
  })),

  // 턴 넘기기 State Logic
  turnOver: () => set(() => ({})),

  // Server와 Client Timer Sync 맞추기
  syncTimer: (remainingTime: number) => set(() => ({
    currentTimer: remainingTime,
  })),

  // 게임 종료 State Logic
  gameOver: () => set(() => ({
    problemInfo: null,
    currentPlayers: [],
    currentTurnPlayerId: null,
    currentQuestion: null,
    gameHistory: [],
    currentTimer: 0,
    nextInteractionId: 0,
  }))
}));


export default useGameStore;