import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockDataDefaultProblem } from "@/mockdata";
import useProblemStore from "@/stores/problemStore";
import { useEffect } from "react";

const WaitingProblemInfo = () => {
  const problemContent = useProblemStore(state => state.content);
  const problemAnswer = useProblemStore(state => state.answer); 
  const setProblem = useProblemStore(state => state.joinAsPlayer);

  // 예상 : 기본값 false, 방장 문제 선택 시 참가자 false, 정답 공개 후 true, 방장은 선택 이후 모두 true
  const isNew: boolean = true;

  useEffect(() => {
    setProblem(mockDataDefaultProblem);
  }, []);

  const layers: number[] = [1, 2, 3, 4, 5];

  return (
    <>
      <Card className="grid grid-flow-col grid-rows-5 p-4">
        <Card className="align-center">
          <span className="align-center text-2xl pl-4">{problemContent}</span>
        </Card>
        <Card className="row-span-4 h-full p-8">
          {isNew ? (
            <p className="text-[24px]">{problemAnswer}</p>
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
