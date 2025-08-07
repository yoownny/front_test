// 게임방의 룸 상태 관리
import { AnswerStatus, type Interaction } from "@/types/game/game";
import type { GamePlayer } from "@/types/user";
import type { GameStoreType } from "./types";
import { create } from "zustand";

const useGameStore = create<GameStoreType>()((set, get) => ({
  // Initial State
  // 게임 정보
  roomId: -1,
  players: [],
  remainingQuestions: 0,
  totalQuestions: 0,

  // 질문 정보
  currentQuestion: null,
  gameHistory: [],

  // 게임
  currentTimer: 0,

  // State Logic 별도
  nextInteractionId: 1,

  // 게임 시작 State Logic
  // gameStart: (
  //   roomId: number,
  //   playerList: GamePlayer[],
  //   remainingQuestions: number,
  //   totalQuestions: number,
  //   targetUserId: number,
  //   targetUsername: string
  // ) =>
  //   set(() => ({
  //     roomId: roomId,
  //     players: playerList,
  //     remainingQuestions,
  //     totalQuestions,
  //     currentQuestionerId: targetUserId,
  //     currentQuestionerName: targetUsername,
  //   })),
  gameStart: (
    roomId: number,
    playerList: GamePlayer[],
    remainingQuestions: number,
    totalQuestions: number
  ) =>
    set(() => ({
      roomId: roomId,
      players: playerList,
      remainingQuestions,
      totalQuestions,
      currentQuestion: null,
      gameHistory: [],
      currentTimer: 0,
      nextInteractionId: 1,
    })),

  // 참가자 질문 및 답변 State Logic
  addInteraction: (
    type: "question" | "answer",
    playerId: number,
    content: string
  ) =>
    set((state) => {
      const newInteraction: Interaction = {
        id: playerId,
        username:
          state.players.find((player) => player.id == playerId)?.name ??
          "Unknown",
        type,
        content,
        status: AnswerStatus.PENDING,
      };

      return {
        currentQuestion: newInteraction,
      };
    }),

  // 방장 (질문 및 답변) 응답 State Logic
  addHistory: (
    type: "question" | "answer",
    playerId: number,
    content: string,
    replyContent: AnswerStatus
  ) =>
    set((state) => {
      const newInteraction: Interaction = {
        id: playerId,
        username:
          state.players.find((player) => player.id == playerId)?.name ??
          "Unknown",
        type,
        content,
        status: replyContent,
      };

      return {
        gameHistory: [...state.gameHistory, newInteraction],
        nextInteractionId: state.nextInteractionId + 1,
      };
    }),

  // 턴 넘기기 State Logic
  // turnOver: (targetUserId: number) =>
  //   set(() => ({
  //     currentQuestionerId: targetUserId,
  //   })),

  // Server와 Client Timer Sync 맞추기
  syncTimer: (remainingTime: number) => {
    set({ currentTimer: remainingTime });
  },

  // 게임 종료 State Logic
  gameOver: () =>
    set(() => ({
      players: [],
      currentQuestion: null,
      gameHistory: [],
      currentTimer: 0,
      nextInteractionId: 0,
    })),
}));

export default useGameStore;
