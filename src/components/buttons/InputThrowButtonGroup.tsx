import { Button } from "@/components/ui/button";
import type { PlayAction } from "@/types/game/game";
import { sendAnswer, sendQuestion, sendTurnOver } from "@/websocket/sender";
// import { useParams } from "react-router-dom";

interface InputThrowButtonGroupProps {
  content: string;
}

const InputThrowButtonGroup = ({ content }: InputThrowButtonGroupProps) => {
  // 여기에 zustand 요청 함수가 전달됩니다.
  // const roomId = Number(useParams().roomId);
  const roomId = 0;

  const buttons: PlayAction[] = [
    {
      buttonLabel: "질문하기",
      onClick: () => sendQuestion(roomId, content),
    },
    {
      buttonLabel: "추리하기",
      onClick: () => sendAnswer(roomId, content),
    },
    {
      buttonLabel: "차례 넘기기",
      onClick: () => sendTurnOver(roomId),
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
          onClick={keys.onClick}
        >
          {keys.buttonLabel}
        </Button>
      ))}
    </div>
  );
};

export default InputThrowButtonGroup;
