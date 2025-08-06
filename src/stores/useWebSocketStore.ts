// 게임방의 룸 상태 관리
import { Client } from "@stomp/stompjs";
import { create } from 'zustand'

type WebsocketStoreType = {
  client: Client | null;
  connected: boolean;
  setClient: (client: Client | null) => void;
  setConnected: (connected: boolean) => void;
};

// 상태 표현
const useWebsocketStore = create<WebsocketStoreType>((set) => ({
  client: null,
  connected: false,
  setClient: (client) => set({ client }),
  setConnected: (connected) => set({ connected }),
}));

export default useWebsocketStore;