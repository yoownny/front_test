// 게임방의 룸 상태 관리
// import { mockDataPlayerList } from "@/mockdata";
import type { ChatLog } from "@/types/chat";
import type { RoomDetailResponse } from "@/types/room/roomDetail";
import type { User } from "@/types/user";
import type { RoomStoreType } from "./types/room";
import { create } from "zustand";

const useRoomStore = create<RoomStoreType>()((set) => ({
  // initial state
  roomId: 0,
  gameState: "WAITING",
  numPlayers: 0,
  maxPlayers: 0,
  hostId: -1,
  players: [],
  chattings: [],
  nextChatlogId: 0,

  // 방 입장 State Logic
  setRoom: (roomData: RoomDetailResponse) =>
    set(() => ({
      roomId: roomData.roomId,
      gameState: roomData.gameState,
      maxPlayers: roomData.maxPlayers,
      numPlayers: roomData.numPlayers,
      hostId: roomData.hostId,
      players: roomData.participants,
    })),

  // 방 나가기 및 삭제 State Logic
  resetRoom: () =>
    set(() => ({
      roomId: -1,
      status: "WAITING",
      maxPlayers: 0,
      hostName: "",
      players: [],
      chattings: [],
      nextChatlogId: 0,
    })),

  joinPlayer: (newPlayer: User, currentPlayers: number) =>
    set((state) => ({
      players: [...state.players, newPlayer],
      numPlayers: currentPlayers,
    })),

  // 채팅 상호작용 State Logic (system message도 포함)
  addChatting: (username: string, content: string, timestamp: string) =>
    set((state) => {
      const nowChatId = state.nextChatlogId;
      const newChatLog: ChatLog = {
        id: nowChatId,
        user: username,
        content: content,
        timestamp: timestamp,
      };

      return {
        chattings: [...state.chattings, newChatLog].sort((a, b) =>
          a.timestamp.localeCompare(b.timestamp)
        ),
        nextChatlogId: state.nextChatlogId + 1,
      };
    }),

  // 방장 변경 State Logic
  setHost: (newHostId: number) =>
    set((state) => {
      const updatedplayerlist = state.players.map((player) => {
        if (player.id === newHostId) {
          // 새 Host ID 일치
          return { ...player, isHost: true };
        } else if (player.id === state.hostId) {
          // 기존 Host name 일치
          return { ...player, isHost: false };
        }
        // 둘다 아닌 경우 그대로
        return player;
      });

      const newHost = updatedplayerlist.find(
        (player) => player.id === newHostId
      );

      return {
        players: updatedplayerlist,
        hostName: newHost?.name,
      };
    }),

  // 준비 상태 변경 State Logic
  toggleReady: (userId: number) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === userId
          ? {
              ...player,
              status: player.status === "STANDBY" ? "READY" : "STANDBY",
            }
          : player
      ),
    })),

  // 게임 시작 Logic
  setStatus: () =>
    set((state) => ({
      gameState: state.gameState === "WAITING" ? "IN_GAME" : "WAITING",
    })),
}));

export default useRoomStore;
