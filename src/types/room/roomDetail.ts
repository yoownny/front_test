import type { User } from "../user";

export interface RoomDetailResponse {
  roomId: number;
  gameState: "WAITING" | "IN_GAME";
  maxPlayers: number;
  numPlayers: number;
  hostId: number;
  participants: User[];
}