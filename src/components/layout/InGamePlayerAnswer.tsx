import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnswerAssessButtonGroup from "../buttons/AnswerAssessButtonGroup";
import useGameStore from "@/stores/gameStore";

const InGamePlayerAnswer = () => {
  const currentQuestion = useGameStore((state) => state.currentQuestion);

  return (
    <Card className="h-full flex flex-col p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-[24px] font-bold">
          <Card className="p-4">{currentQuestion?.username}의 답변</Card>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <Card className="h-full p-4 text-[16px]">
          <span>{currentQuestion?.content}</span>
        </Card>
      </CardContent>

      <CardFooter className="p-0">
        <AnswerAssessButtonGroup question={currentQuestion} />
      </CardFooter>
    </Card>
  );
};

export default InGamePlayerAnswer;
