export type RoomSummary = {
  roomId: number;
  title: string;
  currentPlayers: number;
  maxPlayers: number;
  gameState: "WAITING" | "IN_GAME";
  problemType: "EXISTING" | "CUSTOM";
  genres: string[]; // 1~3개
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  timeLimit: number;
  hostName: string;

  // Store 설정할 때 find(nickname) 으로 바로 찾아서 넣으면 됨
  // hostId: number;
}