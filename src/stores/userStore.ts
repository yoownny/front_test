// 로그인 시 저장할 상태 정보
import { create } from "zustand";

interface userStoreType {
  userId: number;
  userName: string;
  setUser: (id: number, name: string) => void;
}

const usePlayerStore = create<userStoreType>()((set) => ({
  userId: -1,
  userName: "",
  
  // Login 후 본인 User 정보 설정
  setUser: (id: number, name: string) => set(() => ({
    userId: id,
    userName: name,
  }))
}));

export default usePlayerStore;