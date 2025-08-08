// 해당 타입은 UI 사용 및 Props를 위한 FE Custom Type입니다.
// 실제 타입은 BE API 응답에 따라 결정됩니다.

export interface User {
  id: number;
  name: string;
  isHost: boolean;
  status: "WAITING" | "READY" | "PLAYING";
}

export interface GamePlayer extends User {
  answerAttempts: number;
}
