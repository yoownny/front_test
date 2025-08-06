import type { Interaction } from "@/types/game";
import { ScrollArea } from "../ui/scroll-area";
import HistoryItem from "./HistoryItem";

// 사용하는 타입은 Interaction 으로 가정합니다.
const historyMockData: Array<Interaction> = [
  {
    id: 1,
    type: "question",
    player: "Craftor",
    content: "그는 왜 늦었나요?",
    reply: "yes",
  },
  {
    id: 2,
    type: "question",
    player: "연화설비",
    content: "남자는 지하철이 지연되어 늦었습니다.",
    reply: "neutral",
  }, // 변경됨
  {
    id: 3,
    type: "question",
    player: "김바브",
    content: "사고는 누구의 잘못인가요?",
    reply: "no",
  },
  {
    id: 4,
    type: "answer",
    player: "Craftor",
    content: "운전자가 신호를 무시해서 사고가 났습니다.",
    reply: "yes",
  },
  {
    id: 5,
    type: "question",
    player: "SEGAChannel",
    content: "그는 직장인이었나요?",
    reply: "yes",
  },
  {
    id: 6,
    type: "answer",
    player: "김바브",
    content: "그는 퇴직한 공무원이었습니다.",
    reply: "no",
  },
  {
    id: 7,
    type: "question",
    player: "까까미",
    content: "피해자는 생존했나요?",
    reply: null,
  },
  {
    id: 8,
    type: "question",
    player: "SEGAChannel",
    content: "피해자는 현장에서 사망했습니다.",
    reply: "neutral",
  }, // 변경됨
  {
    id: 9,
    type: "question",
    player: "연화설비",
    content: "도시는 어디였나요?",
    reply: null,
  },
  {
    id: 10,
    type: "answer",
    player: "까까미",
    content: "서울 도심 한복판에서 벌어진 사고입니다.",
    reply: "no_response",
  },
  {
    id: 11,
    type: "question",
    player: "Craftor",
    content: "그는 가족이 있나요?",
    reply: "no_response",
  },
  {
    id: 12,
    type: "answer",
    player: "연화설비",
    content: "그는 두 자녀와 부인이 있습니다.",
    reply: null,
  },
  {
    id: 13,
    type: "question",
    player: "김바브",
    content: "사건은 언제 발생했나요?",
    reply: "yes",
  },
  {
    id: 14,
    type: "question",
    player: "까까미",
    content: "이번 주 월요일 새벽이었습니다.",
    reply: "neutral",
  }, // 변경됨
  {
    id: 15,
    type: "question",
    player: "SEGAChannel",
    content: "의도적인 범행이었나요?",
    reply: null,
  },
  {
    id: 16,
    type: "answer",
    player: "Craftor",
    content: "우발적인 사고였습니다.",
    reply: "no",
  },
  {
    id: 17,
    type: "question",
    player: "까까미",
    content: "그는 술에 취해 있었나요?",
    reply: null,
  },
  {
    id: 18,
    type: "answer",
    player: "SEGAChannel",
    content: "음주 측정 결과 음주 상태였습니다.",
    reply: "yes",
  },
  {
    id: 19,
    type: "question",
    player: "연화설비",
    content: "사고 차량은 어떤 종류였나요?",
    reply: "neutral",
  },
  {
    id: 20,
    type: "question",
    player: "김바브",
    content: "SUV 차량이었습니다.",
    reply: "no",
  }, // 변경됨
];

const HistoryList = () => {
  return (
    <ScrollArea className="h-full w-full p-4 rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="flex flex-col gap-4">
        {historyMockData.map((history) => (
          <HistoryItem key={history.id} History={history} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default HistoryList;
