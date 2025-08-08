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
  leavePlayer: (targetUserId: number) => void;
  leaveHost: (playersNewList: User[], newHostId: number) => void;
  addChatting: (username: string, content: string, timestamp: string) => void;
  setHost: (room: { roomId: number; hostId: number; players: User[] }) => void;
  updateStatus: (players: User[]) => void;
}
