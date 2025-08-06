import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HostButtonSet = () => {
  // // 이 함수에서는 게임 선택 Modal을 띄웁니다.
  // const onSelectProblem = () => {

  // }

  // // 이 함수에서는 게임 시작 Logic이 들어가며, 방 상태를 바꿉니다.
  // const onGameStart = () => {

  // }

  return (
    <Card className="p-6 grid grid-rows-2 gap-8">
      <Button variant="outline" className="h-full text-[24px]">문제 변경</Button>
      <Button variant="outline" className="h-full text-[24px]">게임 시작</Button>
    </Card>
  );
};

export default HostButtonSet;
