import WaitingTemplate from "@/templates/WaitingTemplate";
import GameHostTemplate from "@/templates/GameHostTemplate";
import GamePlayerTemplate from "@/templates/GamePlayerTemplate";
import { useEffect, type ReactNode } from "react";
import type { User } from "@/types/user";
import type { RoomDetailResponse } from "@/types/roomDetail";
import { useParams } from "react-router-dom";
import { closeConnect, openConnect } from "@/utils/webSocketConnection";

const RoomPage = () => {
  // 현재 Player 또는 Room State에 기반하여 렌더링되는 Template가 달라집니다.
  // 아래는 임시로 State를 정의하였습니다.
  const mockPlayers: RoomDetailResponse["participants"] = [
    // 1. 방장
    {
      id: 1,
      name: "Craftor",
      isHost: true,
      isReady: false,
    },

    // 2. 참가자 (준비 X)
    {
      id: 2,
      name: "Baek_Kim_Chi",
      isHost: false,
      isReady: false,
    },

    // 3. 참가자 (준비 O)
    {
      id: 3,
      name: "연화설비",
      isHost: false,
      isReady: true,
    },
  ];

  const gameState: string = "in_game";
  const currentPlayer: User = mockPlayers[0];
  const isQuestion: boolean = true;

  const params = useParams();

  useEffect(() => {
    openConnect(params.id);
    return () => closeConnect();
  });

  const templateStatus = (): ReactNode => {
    switch (gameState) {
      case "in_game":
        return currentPlayer.isHost ? (
          <GameHostTemplate
            players={mockPlayers}
            currentPlayer={currentPlayer}
            isQuestion={isQuestion}
          />
        ) : (
          <GamePlayerTemplate />
        );
      default:
        return (
          <WaitingTemplate
            players={mockPlayers}
            currentPlayer={currentPlayer}
          />
        );
    }
  };

  return <div className="max-w-[1440px] mx-auto p-10">{templateStatus()}</div>;
};

export default RoomPage;