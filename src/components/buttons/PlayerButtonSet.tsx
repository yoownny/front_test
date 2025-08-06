import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlayerButtonSetReadyProps {
  isReady: boolean;
}

const PlayerButtonSet = ({isReady}: PlayerButtonSetReadyProps) => {
  // // 이 함수에서는 플레이어의 준비상태를 바꿉니다.
  // const onPlayerReady = () => {

  // }

  return (
    <Card className="p-6 grid grid-rows-2 gap-8">
      <span className="text-[20px] text-center self-center">
        모든 플레이어가 준비해야 게임을 시작할 수 있습니다.
      </span>
      <Button variant="outline" className="h-full text-[24px]">
        {!isReady ? "게임 준비" : "준비 취소"}
      </Button>
    </Card>
  );
};

export default PlayerButtonSet;
