import WaitingTemplate from "@/layouts/WaitingTemplate";
import GameHostTemplate from "@/layouts/GameHostTemplate";
import GamePlayerTemplate from "@/layouts/GamePlayerTemplate";
import { useEffect, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import useRoomStore from "@/stores/roomStore";
import { joinRoom, leaveRoom } from "@/websocket/subscription";
import useWebsocketStore from "@/stores/useWebSocketStore";
import useUserStore from "@/stores/userStore";

const RoomPage = () => {
  // const players = useRoomStore((state) => state.players);
  const gameState = useRoomStore((state) => state.gameState);
  const hostId = useRoomStore((state) => state.hostId);
  const userId = useUserStore((state) => state.userId);
  const players = useRoomStore(state => state.players);

  const params = useParams();
  const roomId = Number(params.id);

  useEffect(() => {
    useWebsocketStore.getState().setCurrentRoomId(roomId);
    joinRoom(roomId);

    return () => {
      leaveRoom(roomId);
      useWebsocketStore.getState().setCurrentRoomId(null);
    };
  }, []);

  const templateStatus = (): ReactNode => {
    switch (gameState) {
      case "IN_GAME":
        return hostId === userId ? (
          <GameHostTemplate />
        ) : (
          <GamePlayerTemplate />
        );
      default:
        return <WaitingTemplate players={players} />;
    }
  };

  return <div className="max-w-[1440px] mx-auto p-10">{templateStatus()}</div>;
};

export default RoomPage;
