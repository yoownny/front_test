import GameRoomHeader from "@/components/layout/GameRoomHeader";
import GameRoomChatSection from "@/components/layout/GameRoomChatSection";
import InGameProblemInfo from "@/components/layout/InGameProblemInfo";
import InGamePlayerQuestion from "@/components/layout/InGamePlayerQuestion";
import InGamePlayerAnswer from "@/components/layout/InGamePlayerAnswer";
import type { User } from "@/types/user";

interface GameHostTemplatelProps {
  players: User[];
  currentPlayer: User;
  isQuestion: boolean;
}

function GameHostTemplate({
  players,
  currentPlayer,
  isQuestion,
}: GameHostTemplatelProps) {
  return (
    <div className="grid gap-4">
      {/* 상단 고정 헤더 + 하부 (고정 크기 + 상대 크기) */}
      <GameRoomHeader />

      {/* 하단 본 영역 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 채팅 영역 */}
        <GameRoomChatSection />

        {/* 문제/질문 응답 섹션 */}
        <div className="max-h-[1000px] col-span-2 grid grid-rows-2 gap-4">
          {/* 현재 문제 정보 */}
          <InGameProblemInfo />

          {/* 질문 응답 영역 */}
          {isQuestion ? <InGamePlayerQuestion /> : <InGamePlayerAnswer />}
        </div>
      </div>
    </div>
  );
}

export default GameHostTemplate;
