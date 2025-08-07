import type { AnswerStatus, Interaction } from "@/types/game/game";
import type { GamePlayer } from "@/types/user";

export interface GameStoreType {
  // 게임 정보
  roomId: number;
  players: GamePlayer[];
  remainingQuestions: number;
  totalQuestions: number;

  // 질문 정보
  currentQuestion: Interaction | null;
  gameHistory: Interaction[];

  // 게임
  currentTimer: number;

  // State Logic 별도
  nextInteractionId: number;

  gameStart: (
    roomId: number,
    playerList: GamePlayer[],
    remainingQuestions: number,
    totalQuestions: number
  ) => void;

  addInteraction: (
    type: "question" | "answer",
    playerId: number,
    content: string
  ) => void;

  addHistory: (
    type: "question" | "answer",
    playerId: number,
    content: string,
    replyContent: AnswerStatus
  ) => void;
  // turnOver: (targetUserId: number) => void;
  syncTimer: (remainingTime: number) => void;
  gameOver: () => void;
}
