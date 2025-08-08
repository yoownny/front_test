import { Button } from "@/components/ui/button";
import {
  AnswerStatus,
  type Interaction,
  type PlayAction,
} from "@/types/game/game";
import { sendReply } from "@/websocket/sender";

interface QnAButtonGroupProps {
  question: Interaction;
}

const QnAButtonGroup = ({ question }: QnAButtonGroupProps) => {
  const roomId = 0;

  const isDisabled =
    !question ||
    question.content.trim() === "" ||
    question.status !== AnswerStatus.PENDING;

  const buttons: PlayAction[] = [
    {
      buttonLabel: "예",
      onClick: () => {
        if (!isDisabled)
          sendReply(
            roomId,
            question.id,
            question.content,
            AnswerStatus.CORRECT
          );
      },
    },
    {
      buttonLabel: "아니오",
      onClick: () => {
        if (!isDisabled)
          sendReply(
            roomId,
            question.id,
            question.content,
            AnswerStatus.INCORRECT
          );
      },
    },
    {
      buttonLabel: "상관없음",
      onClick: () => {
        if (!isDisabled)
          sendReply(
            roomId,
            question.id,
            question.content,
            AnswerStatus.IRRELEVANT
          );
      },
    },
  ];

  return (
    <div className="flex w-full rounded-md shadow-sm" role="group">
      {buttons.map((keys, index) => (
        <Button
          key={index}
          className="flex-1 first:rounded-r-none last:rounded-l-none not-first:border-l-0 not-first:not-last:rounded-none"
          onClick={keys.onClick}
          disabled={isDisabled}
        >
          {keys.buttonLabel}
        </Button>
      ))}
    </div>
  );
};

export default QnAButtonGroup;
