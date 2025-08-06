import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QnAButtonGroup from "../buttons/QnAButtonGroup";
import type { Interaction } from "@/types/game";

const InGamePlayerQuestion = () => {
  // Question에 대한 Sample Data 입니다.
  const QuestionInfo: Interaction = {
    type: "question",
    id: 1,
    player: "Craftor",
    content: "남자는 어떤 직업을 가지고 있었나요?",
    reply: null,
  };

  return (
    <Card className="h-full flex flex-col p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-[24px] font-bold">
          <Card className="p-4">{QuestionInfo.player}의 질문</Card>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <Card className="h-full p-4 text-[16px]">
          <span>{QuestionInfo.content}</span>
        </Card>
      </CardContent>

      <CardFooter className="p-0">
        <QnAButtonGroup />
      </CardFooter>
    </Card>
  );
};

export default InGamePlayerQuestion;
