import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sendGameStart } from "@/websocket/sender";

const HostButtonSet = () => {
  // // 이 함수에서는 게임 선택 Modal을 띄웁니다.
  // const onSelectProblem = () => {};

  // // 이 함수에서는 게임 시작 Logic이 들어가며, 방 상태를 바꿉니다.
  const onGameStart = () => {
    // API 요청 및 WS
    sendGameStart(0);
  };

  return (
    <Card className="p-6 grid grid-rows-2 gap-8">
      <Button variant="outline" className="h-full text-[24px] cursor-pointer">
        사건 파일 변경
      </Button>
      <Button
        variant="outline"
        className="h-full text-[24px] cursor-pointer"
        onClick={onGameStart}
      >
        게임 시작
      </Button>
    </Card>
  );
};

export default HostButtonSet;
