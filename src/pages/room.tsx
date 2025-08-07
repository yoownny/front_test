import WaitingTemplate from "@/layouts/WaitingTemplate";
import GameHostTemplate from "@/layouts/GameHostTemplate";
import GamePlayerTemplate from "@/layouts/GamePlayerTemplate";
import { useEffect, type ReactNode } from "react";
import type { User } from "@/types/user";
import { useParams } from "react-router-dom";
import useRoomStore from "@/stores/roomStore";
import { joinRoom, leaveRoom } from "@/websocket/subscription";
import { mockDataDefaultProblem, mockDataPlayerList } from "@/mockdata";
import useProblemStore from "@/stores/problemStore";
import useWebsocketStore from "@/stores/useWebSocketStore";

const RoomPage = () => {
  // const players = useRoomStore((state) => state.players);
  const gameState = useRoomStore((state) => state.gameState);
  const maxPlayers = useRoomStore((state) => state.maxPlayers);
  const numPlayers = useRoomStore((state) => state.numPlayers);
  const hostId = useRoomStore((state) => state.hostId);
  const setRoom = useRoomStore.getState().setRoom;
  const setProblem = useProblemStore.getState().joinAsHost;
  const players = mockDataPlayerList;

  // const params = useParams();
  // const roomId = Number(params.id);
  const roomId = 0;

  const currentPlayer: User = players[2];

  useEffect(() => {
    useWebsocketStore.getState().setCurrentRoomId(roomId);
    joinRoom(roomId);
    setRoom({
      roomId: 0,
      gameState: "IN_GAME",
      maxPlayers: 6,
      numPlayers: 3,
      hostId: 1,
      participants: mockDataPlayerList.map((player) => ({
        id: player.id,
        name: player.name,
        isHost: player.isHost,
        status: "READY",
      })),
    });
    setProblem({
      ...mockDataDefaultProblem,
    });
    return () => {
      leaveRoom(roomId);
      useWebsocketStore.getState().setCurrentRoomId(null);
    };
  }, []);

  const templateStatus = (): ReactNode => {
    switch (gameState) {
      case "IN_GAME":
        return currentPlayer.isHost ? (
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
