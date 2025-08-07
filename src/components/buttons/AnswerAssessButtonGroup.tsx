import { Button } from "@/components/ui/button";
import { AnswerStatus, type Interaction, type PlayAction } from "@/types/game/game";
import { sendJudgement } from "@/websocket/sender";

interface AnswerAssessButtonGroupProps {
  question: Interaction;
}

const AnswerAssessButtonGroup = ({
  question,
}: AnswerAssessButtonGroupProps) => {
  const roomId = 0;

  const buttons: PlayAction[] = [
    {
      buttonLabel: "맞습니다",
      onClick: () => {
        if (question.status === AnswerStatus.PENDING)
          sendJudgement(
            roomId,
            question.id,
            question.content,
            AnswerStatus.CORRECT
          );
      },
    },
    {
      buttonLabel: "아닙니다",
      onClick: () => {
        if (question.status === AnswerStatus.PENDING)
          sendJudgement(
            roomId,
            question.id,
            question.content,
            AnswerStatus.INCORRECT
          );
      },
    },
  ];

  return (
    <div className="flex w-full rounded-md shadow-sm" role="group">
      {buttons.map((keys, index) => (
        <Button
          key={index}
          className="
          flex-1
          first:rounded-r-none
          last:rounded-l-none
          not-first:border-l-0
          not-first:not-last:rounded-none"
          onClick={() => onclick}
        >
          {keys.buttonLabel}
        </Button>
      ))}
    </div>
  );
};

export default AnswerAssessButtonGroup;
