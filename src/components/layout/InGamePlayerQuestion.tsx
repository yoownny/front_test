import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QnAButtonGroup from "../buttons/QnAButtonGroup";
import useGameStore from "@/stores/gameStore";

const InGamePlayerQuestion = () => {
  const currentQuestion = useGameStore((state) => state.currentQuestion);

  return (
    <Card className="h-full flex flex-col p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-[24px] font-bold">
          <Card className="p-4">
            {currentQuestion
              ? `${currentQuestion.username}의 질문`
              : "잠시 뒤 참가자가 질문을 시작합니다!"}
          </Card>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <Card className="h-full p-4 text-[16px]">
          <span>
            {currentQuestion
              ? currentQuestion.content
              : "질문이 올 때까지 대기해 주세요."}
          </span>
        </Card>
      </CardContent>

      <CardFooter className="p-0">
        <QnAButtonGroup question={currentQuestion} />
      </CardFooter>
    </Card>
  );
};

export default InGamePlayerQuestion;
