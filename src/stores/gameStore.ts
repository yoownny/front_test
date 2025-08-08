// 게임방의 룸 상태 관리
import { AnswerStatus, type Interaction } from "@/types/game/game";
import type { GameStoreType } from "./types";
import { create } from "zustand";

const useGameStore = create<GameStoreType>()((set) => ({
  // Initial State
  // 게임 정보
  roomId: -1,
  players: [],
  remainingQuestions: 0,
  totalQuestions: 0,

  currentPlayer: null,
  currentQuestion: null,
  gameHistory: [],
  currentTimer: 0,

  // 결과 정보
  winnerId: 0,
  winnerName: "",
  submitted_answer: "",
  playTime: "",
  totalQuestionCount: 0,

  // 기타 정보
  nextInteractionId: 1,

  gameStart: (
    roomId,
    playerList,
    remainingQuestions,
    totalQuestions,
    currentPlayer
  ) =>
    set(() => ({
      roomId,
      players: playerList,
      remainingQuestions,
      totalQuestions,
      currentPlayer,
      currentQuestion: null,
      gameHistory: [],
      submitted_answer: "",
      currentTimer: 0,
      nextInteractionId: 1,
    })),

  addInteraction: (type, playerId, content) =>
    set((state) => {
      const username =
        state.players.find((p) => p.id === playerId)?.name ?? "Unknown";
      return {
        currentQuestion: {
          id: playerId,
          username,
          type,
          content,
          status: AnswerStatus.PENDING,
        },
      };
    }),

  addHistory: (type, playerId, content, replyContent) =>
    set((state) => {
      if (!content.trim()) return {};

      const username =
        state.players.find((p) => p.id === playerId)?.name ?? "Unknown";
      const newInteraction: Interaction = {
        id: state.nextInteractionId,
        username,
        type,
        content,
        status: replyContent,
      };

      const isDuplicate = state.gameHistory.some(
        (h) =>
          h.type === type &&
          h.username === username &&
          h.content === content &&
          h.status === replyContent
      );

      if (isDuplicate) return state;
      return {
        currentQuestion: null,
        gameHistory: [...state.gameHistory, newInteraction],
        nextInteractionId: state.nextInteractionId + 1,
      };
    }),

  turnOver: (targetUserId) =>
    set((state) => ({
      currentPlayer: state.players.find((p) => p.id === targetUserId) ?? null,
    })),

  syncTimer: (remainingTime) => set({ currentTimer: remainingTime }),

  gameOver: (userId, nickname, content, questionCnt, playTime) =>
    set(() => ({
      winnerId: userId,
      winnerName: nickname,
      submitted_answer: content,
      playTime: playTime,
      totalQuestionCount: questionCnt,
    })),

  gameClosed: () =>
    set(() => ({
      players: [],
      currentQuestion: null,
      gameHistory: [],
      currentTimer: 0,
      nextInteractionId: 1,
    })),
}));

export default useGameStore;
