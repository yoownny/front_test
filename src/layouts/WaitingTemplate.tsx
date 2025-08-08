import GameRoomHeader from "@/components/layout/GameRoomHeader";
import GameRoomChatSection from "@/components/layout/GameRoomChatSection";
import WaitingProblemInfo from "@/components/layout/WaitingProblemInfo";
import PlayerListPanel from "@/components/layout/PlayerListPanel";
import HostButtonSet from "@/components/buttons/HostButtonSet";
import PlayerButtonSet from "@/components/buttons/PlayerButtonSet";
import type { User } from "@/types/user";
import useUserStore from "@/stores/userStore";

interface WaitingTemplateProps {
  players: User[];
}

function WaitingTemplate({ players }: WaitingTemplateProps) {
  const myUserId = useUserStore((state) => state.userId);
  const isHost =
    players.find((player) => player.id === myUserId)?.isHost ?? false;

  return (
    <div className="grid gap-4">
      {/* 상단 고정 헤더 + 하부 (고정 크기 + 상대 크기) */}
      <GameRoomHeader />

      {/* 하단 본 영역 */}
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        {/* 채팅 영역 */}
        <GameRoomChatSection />

        {/* 문제/참가자/버튼 섹션 */}
        <div className="max-h-[700px] grid gap-4">
          {/* 문제 정보 */}
          <WaitingProblemInfo />

          {/* 참가자 + 버튼 (3:2 비율) */}
          <div className="grid grid-cols-[3fr_2fr] gap-4">
            {/* 참가자 패널 */}
            <PlayerListPanel />

            {/* 버튼 영역 */}
            {isHost ? <HostButtonSet /> : <PlayerButtonSet />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingTemplate;
