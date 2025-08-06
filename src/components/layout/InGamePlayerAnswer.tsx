import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnswerAssessButtonGroup from "../buttons/AnswerAssessButtonGroup";
import type { Interaction } from "@/types/game";

const InGamePlayerAnswer = () => {
  // Answer에 대한 Sample Data 입니다.
  const AnswerInfo: Interaction = {
    type: "answer",
    id: 1,
    player: "Craftor",
    content: `남자는 소방관이었으며, 불을 진화하는 과정에서 장비 고장으로 인해 연기를 마셔
    어지러움증을 느끼고 그대로 쓰러졌습니다.`,
    reply: null,
  };

  return (
    <Card className="h-full flex flex-col p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-[24px] font-bold">
          <Card className="p-4">{AnswerInfo.player}의 답변</Card>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <Card className="h-full p-4 text-[16px]">
          <span>{AnswerInfo.content}</span>
        </Card>
      </CardContent>

      <CardFooter className="p-0">
        <AnswerAssessButtonGroup />
      </CardFooter>
    </Card>
  );
};

export default InGamePlayerAnswer;
