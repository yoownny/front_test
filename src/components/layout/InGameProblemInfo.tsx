import { Card } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import useProblemStore from "@/stores/problemStore";

const InGameProblemInfo = () => {
  const problemContent = useProblemStore(state => state.content);
  const problemAnswer = useProblemStore(state => state.answer);

  return (
    <>
      <Card className="grid grid-flow-col grid-rows-4 p-4">
        <Card className="align-center p-4">
          <span className="align-center text-center text-xl">
            {problemContent}
          </span>
        </Card>
        <Card className="row-span-3 h-full p-4">
          <ScrollArea className="h-full w-full p-2 rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <span className="text-lg">{problemAnswer}</span>
          </ScrollArea>
        </Card>
      </Card>
    </>
  );
};

export default InGameProblemInfo;
