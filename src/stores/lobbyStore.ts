import type { RoomSummary } from "@/types/room/roomSummary";
import { create } from "zustand";

interface UserStoreType {
  roomList: RoomSummary[];

  getRoomList: (rooms: RoomSummary[]) => void;
  changeNumPlayer: (targetRoomId: number, nowCurrentPlayers: number) => void;
  deleteRoom: (deletedRoomId: number) => void;
  createRoom: (newRoom: RoomSummary) => void;
}

const useUserStore = create<UserStoreType>()((set) => ({
  roomList: [],

  getRoomList: (rooms) => set(() => ({ roomList: rooms })),

  createRoom: (newRoom) =>
    set((state) => ({
      roomList: [...state.roomList, newRoom],
    })),

  changeNumPlayer: (targetRoomId, nowCurrentPlayers) =>
    set((state) => ({
      roomList: state.roomList.map((room) =>
        room.roomId === targetRoomId
          ? { ...room, currentPlayers: nowCurrentPlayers }
          : room
      ),
    })),

  deleteRoom: (deletedRoomId) =>
    set((state) => ({
      roomList: state.roomList.filter((room) => room.roomId !== deletedRoomId),
    })),
}));

export default useUserStore;
