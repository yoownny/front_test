// 게임방의 룸 상태 관리
import type { ProblemBrief } from "@/types/problem";
import type { RoomDetailResponse } from "@/types/roomDetail";
import type { User } from "@/types/user";
import { create } from "zustand";

interface RoomStoreType {
  // state 값 정의
  roomId: number;
  title: string;
  status: "waiting" | "in_game";
  maxPlayers: number;
  hostName: string;
  problem: ProblemBrief | null;
  players: User[];

  setRoom: (roomData: RoomDetailResponse) => void;
  resetRoom: () => void;
  setHost: (newHostId: number) => void;
  toggleReady: (userId: number) => void;
}

const useRoomStore = create<RoomStoreType>()((set) => ({
  roomId: -1,
  title: "",
  status: "waiting",
  maxPlayers: 0,
  hostName: "",
  problem: null,
  players: [],

  // 방 입장 State Logic
  setRoom: (roomData: RoomDetailResponse) => set(() => {
    const playerlist = roomData.participants;
    const host = playerlist.find((player) => player.id === roomData.hostId);

    return {
      roomId: roomData.RoomId,
      title: roomData.title,
      status: roomData.status,
      maxPlayers: roomData.maxPlayers,
      hostName: host ? host.name : "",
      problem: roomData.problemInfo,
      players: playerlist,
    }
  }),

  // 방 나가기 및 삭제 State Logic
  resetRoom: () => set(() => ({
    roomId: -1,
    title: "",
    status: "waiting",
    maxPlayers: 0,
    hostName: "",
    problem: null,
    players: [],
  })),

  // 방장 변경 State Logic
  setHost: (newHostId: number) => set((state) => {
    const updatedplayerlist = state.players.map((player) => {
      if (player.id === newHostId) {
        // 새 Host ID 일치
        return { ...player, isHost: true };
      } else if (player.name === state.hostName) {
        // 기존 Host name 일치
        return { ...player, isHost: false };
      }
      // 둘다 아닌 경우 그대로
      return player;
    })

    const newHost = updatedplayerlist.find(player => player.id === newHostId);

    return {
      players: updatedplayerlist,
      hostName: newHost?.name,
    }
  }),

  // 준비 상태 변경 State Logic
  toggleReady: (userId: number) => set((state) => ({
      players: state.players.map((player) => 
        player.id === userId ? { ...player, isReady: !player.isReady } : player
      )
  })),
}));


export default useRoomStore;