import { joinLobby, leaveLobby } from "@/websocket/subscription";
import LobbyTemplate from "@/layouts/LobbyTemplate";
import { useEffect } from "react";
import useWebsocketStore from "@/stores/useWebSocketStore";

const LobbyPage = () => {
  useEffect(() => {
    useWebsocketStore.getState().setCurrentRoomId(null);
    joinLobby();
    return () => {
      leaveLobby();
    };
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto p-10">
      <LobbyTemplate />
    </div>
  );
};

export default LobbyPage;
