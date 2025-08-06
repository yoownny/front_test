import GameRoomHeader from "@/components/layout/GameRoomHeader";
import GameRoomChatSection from "@/components/layout/GameRoomChatSection";
import InGamePlayerInput from "@/components/layout/InGamePlayerInput";
import InGameHistory from "@/components/layout/InGameHistory";

function GamePlayerTemplate() {
  return (
    <div className="grid gap-4">
      {/* 상단 고정 헤더 + 하부 (고정 크기 + 상대 크기) */}
      <GameRoomHeader />

      {/* 하단 본 영역 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 채팅 영역 */}
        <GameRoomChatSection />

        {/* 히스토리/질문 및 답변 섹션 */}
        <div className="max-h-[1000px] col-span-2 grid grid-rows-2 gap-4">
          {/* 현재 문제 정보 */}
          <InGameHistory />

          {/* 질문 답변 영역 */}
          <InGamePlayerInput />

        </div>
      </div>
    </div>
  );
}

export default GamePlayerTemplate;
