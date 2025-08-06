export type RoomSummary = {
  roomId: number;
  title: string;
  currentPlayers: number;
  maxPlayers: number;
  gameState: "waiting" | "in_game";
  problemType: "existing" | "custom";
  genres: string[]; // 1~3개
  difficulty: "easy" | "normal" | "hard";
  timeLimit: number;
  hostName: string;
  
  // Store 설정할 때 find(nickname) 으로 바로 찾아서 넣으면 됨
  // hostId: number;
}
