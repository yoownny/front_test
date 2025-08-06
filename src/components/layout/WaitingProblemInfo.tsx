import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WaitingProblemInfo = () => {
  // 처음 들어왔을 때를 참조해 State를 설정합니다.
  // 예상 : 기본값 false, 방장 문제 선택 시 참가자 false, 정답 공개 후 true, 방장은 선택 이후 모두 true
  const newComeState: boolean = false;

  // 이 내용은 실제 문제 정답과는 무관한 Sample content입니다.
  const sampleAnswer: string = `대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 국회는 법률에 저촉되지 아니하는 범위안에서
  의사와 내부규율에 관한 규칙을 제정할 수 있다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와
  초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 그러하지 아니하다.
  모든 국민은 통신의 비밀을 침해받지 아니한다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.
  국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
  법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.`;

  const layers: number[] = [1, 2, 3, 4, 5];

  return (
    <>
      <Card className="grid grid-flow-col grid-rows-5 p-4">
        <Card className="align-center">
          <span className="align-center text-center text-3xl">문제 제목</span>
        </Card>
        <Card className="row-span-4 h-full p-8">
          {newComeState ? (
            <p className="text-[24px]">{sampleAnswer}</p>
          ) : (
            <div className="space-y-8">
              {layers.map((index) => (
                <Skeleton key={index} className="h-10 w-full rounded-full" />
              ))}
            </div>
          )}
        </Card>
      </Card>
    </>
  );
};

export default WaitingProblemInfo;
