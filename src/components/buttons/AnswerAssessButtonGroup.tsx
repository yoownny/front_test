import { Button } from "@/components/ui/button";

const AnswerAssessButtonGroup = () => {
  // 여기에 zustand 요청 함수가 전달됩니다.

  // 나중에, Button Label과 그에 맞는 실행 함수가 같이 묶입니다.
  const buttonLabel: string[] = ["맞습니다", "아닙니다"];

  return (
    <div className="flex w-full rounded-md shadow-sm" role="group">
      {buttonLabel.map((label, index) => (
        <Button
          key={index}
          className="
          flex-1
          first:rounded-r-none
          last:rounded-l-none
          not-first:border-l-0
          not-first:not-last:rounded-none"
          // onClick={() => onClick(label)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default AnswerAssessButtonGroup;
