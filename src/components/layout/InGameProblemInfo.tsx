import { Card } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";

const InGameProblemInfo = () => {
  // 처음 들어왔을 때를 참조해 State를 설정합니다.
  // 예상 : 기본값 false, 방장 문제 선택 시 참가자 false, 정답 공개 후 true, 방장은 선택 이후 모두 true
  const ProblemInfo: { Problem: string; Answer: string } = {
    Problem: `이 내용에 대하여 헌법의 제 몇 항을 참조하고 있나요?`,

    // 이 내용은 실제 문제 정답과는 무관한 Sample content입니다.
    Answer: `대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 국회는 법률에 저촉되지 아니하는 범위안에서
  의사와 내부규율에 관한 규칙을 제정할 수 있다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와
  초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 그러하지 아니하다.
  모든 국민은 통신의 비밀을 침해받지 아니한다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.
  국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
  법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.`,
  };

  return (
    <>
      <Card className="grid grid-flow-col grid-rows-5 p-4">
        <Card className="align-center p-4 font-bold">
          <span className="align-center text-center text-2xl">
            {ProblemInfo.Problem}
          </span>
        </Card>
        <Card className="row-span-4 h-full p-4">
          <ScrollArea className="h-full w-full p-2 rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <span className="text-xl">{ProblemInfo.Answer}</span>
          </ScrollArea>
        </Card>
      </Card>
    </>
  );
};

export default InGameProblemInfo;
