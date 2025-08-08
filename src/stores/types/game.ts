import type { AnswerStatus, Interaction } from "@/types/game/game";
import type { GamePlayer, User } from "@/types/user";

export interface GameStoreType {
  // 게임 정보
  roomId: number;
  players: GamePlayer[];
  remainingQuestions: number;
  totalQuestions: number;

  // 질문 정보
  currentPlayer: User | null;
  currentQuestion: Interaction | null;
  gameHistory: Interaction[];

  // 결과 정보
  submitted_answer: string;
  winnerId: number;
  winnerName: string;
  playTime: string;
  totalQuestionCount: number;

  // 게임
  currentTimer: number;

  // State Logic 별도
  nextInteractionId: number;

  gameStart: (
    roomId: number,
    playerList: GamePlayer[],
    remainingQuestions: number,
    totalQuestions: number,
    currentPlayer: User
  ) => void;

  addInteraction: (
    type: "QUESTION" | "GUESS",
    playerId: number,
    content: string
  ) => void;

  addHistory: (
    type: "QUESTION" | "GUESS",
    playerId: number,
    content: string,
    replyContent: AnswerStatus
  ) => void;
  turnOver: (targetUserId: number) => void;
  syncTimer: (remainingTime: number) => void;
  gameOver: (
    userId: number,
    nickname: string,
    content: string,
    questionCnt: number,
    playTime: string
  ) => void;
  gameClosed: () => void;
}
