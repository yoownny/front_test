import { ScrollArea } from "../ui/scroll-area";
import HistoryItem from "./HistoryItem";
import useGameStore from "@/stores/gameStore";


const HistoryList = () => {
  const history = useGameStore.getState().gameHistory;

  return (
    <ScrollArea className="h-full w-full p-4 rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="flex flex-col gap-4">
        {history.map((question) => (
          <HistoryItem key={question.id} History={question} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default HistoryList;
