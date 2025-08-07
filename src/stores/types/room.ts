import type { ChatLog } from "@/types/chat";
import type { RoomDetailResponse } from "@/types/room/roomDetail";
import type { User } from "@/types/user";

export interface RoomStoreType {
  roomId: number;
  gameState: "WAITING" | "IN_GAME";
  numPlayers: number;
  maxPlayers: number;
  hostId: number;
  players: User[];
  chattings: ChatLog[];
  nextChatlogId: number;

  setRoom: (roomData: RoomDetailResponse) => void;
  resetRoom: () => void;
  joinPlayer: (newPlayer: User, currentPlayers: number) => void;
  addChatting: (username: string, content: string, timestamp: string) => void;
  setHost: (newHostId: number) => void;
  toggleReady: (userId: number) => void;
  setStatus: () => void;
}
