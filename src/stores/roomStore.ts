// 게임방의 룸 상태 관리
// import { mockDataPlayerList } from "@/mockdata";
import type { ChatLog } from "@/types/chat";
import type { RoomStoreType } from "./types/room";
import { create } from "zustand";

const useRoomStore = create<RoomStoreType>()((set) => ({
  roomId: 0,
  gameState: "WAITING",
  numPlayers: 0,
  maxPlayers: 0,
  hostId: 0,
  players: [],
  chattings: [],
  nextChatlogId: 0,
  timeLimit: 0, // 분 기준

  // 방 입장
  setRoom: (roomData) =>
    set(() => ({
      roomId: roomData.roomId,
      gameState: roomData.gameState,
      maxPlayers: roomData.maxPlayers,
      numPlayers: roomData.numPlayers,
      hostId: roomData.hostId,
      players: roomData.participants,
      timeLimit: roomData.timeLimit,
    })),

  // 방 퇴장
  resetRoom: () =>
    set(() => ({
      roomId: 0,
      gameState: "WAITING",
      maxPlayers: 0,
      numPlayers: 0,
      hostId: 0,
      players: [],
      chattings: [],
      nextChatlogId: 0,
    })),

  // 다른 플레이어 입장
  joinPlayer: (newPlayer, currentPlayers) =>
    set((state) => ({
      players: [...state.players, newPlayer],
      numPlayers: currentPlayers,
    })),

  // 다른 플레이어 퇴장
  leavePlayer: (targetUserId) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== targetUserId),
      numPlayers: state.numPlayers - 1,
    })),

  // 방장 퇴장
  leaveHost: (playersNewList, newHostId) => set(() => ({
    players: playersNewList,
    hostId: newHostId
  })),

  // 채팅 내역 추가
  addChatting: (username, content, timestamp) =>
    set((state) => {
      const isDuplicate = state.chattings.some(
        (c) =>
          c.user === username &&
          c.content === content &&
          c.timestamp === timestamp
      );
      if (isDuplicate) return state;

      const newChatLog: ChatLog = {
        id: state.nextChatlogId,
        user: username,
        content,
        timestamp,
      };

      return {
        chattings: [...state.chattings, newChatLog].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ),
        nextChatlogId: state.nextChatlogId + 1,
      };
    }),

  // 방장 변경
  setHost: (room) =>
    set(() => ({
      roomId: room.roomId,
      hostId: room.hostId,
      players: room.players.map((p) => ({
        id: p.id,
        name: p.name,
        status: p.status,
        isHost: p.id === room.hostId,
      })),
    })),

  // 준비 상태 변경...?
  updateStatus: (players) => set(() => ({ players })),
}));

export default useRoomStore;
