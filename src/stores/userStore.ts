// 로그인 시 저장할 상태 정보
import { testuser1, testuser2 } from "@/mockdata";
import { create } from "zustand";

interface userStoreType {
  userId: number;
  userName: string;
  
  setUser: (id: number, name: string) => void;
}

const useUserStore = create<userStoreType>()((set) => ({
  // userId: -1,
  // username: "",
  userId: testuser1.userId,
  userName: testuser1.username,
  
  // Login 후 본인 User 정보 설정
  setUser: (id: number, name: string) => set(() => ({
    userId: id,
    userName: name,
  }))

}));

export default useUserStore;