import ChatItem from "./ChatItem";
import type { Log } from "@/types/user";
import { ScrollArea } from "../ui/scroll-area";

const ChatList = () => {
  // 사용하는 타입은 user, content 으로 가정
  // 이건 backend 데이터에 따라서 바뀔 예정
  const chatLogs: Array<Log> = [
    { id: 0, user: "System", content: "Craftor님이 방에 입장했습니다." },
    { id: 1, user: "Craftor", content: "안녕하세요!" },
    { id: 2, user: "Alice", content: "좋은 아침입니다!" },
    { id: 3, user: "Bob", content: "오늘 회의는 몇 시인가요?" },
    { id: 4, user: "Charlie", content: "방금 코드를 푸시했습니다." },
    { id: 5, user: "Dana", content: "점심 메뉴 추천해주세요." },
    { id: 6, user: "System", content: "게임이 곧 시작됩니다. 준비해주세요!" },
    { id: 7, user: "Eve", content: "버그를 수정했어요!" },
    { id: 8, user: "Craftor", content: "리뷰 완료했습니다." },
    { id: 9, user: "Grace", content: "새로운 기능 아이디어가 있어요." },
    { id: 10, user: "Heidi", content: "배포는 오늘 오후입니다." },
    { id: 11, user: "Ivan", content: "API 응답이 느린 것 같아요." },
    { id: 12, user: "Judy", content: "문서 정리 완료했습니다." },
    { id: 13, user: "Craftor", content: "안녕하세요!" },
    { id: 14, user: "Alice", content: "좋은 아침입니다!" },
    { id: 15, user: "Bob", content: "오늘 회의는 몇 시인가요?" },
    { id: 16, user: "Dana", content: "점심 메뉴 추천해주세요." },
    { id: 17, user: "Grace", content: "새로운 기능 아이디어가 있어요." },
    {
      id: 18,
      user: "System",
      content: "연결이 끊어졌습니다. 다시 접속을 시도합니다.",
    },
    { id: 19, user: "Ivan", content: "API 응답이 느린 것 같아요." },
    { id: 20, user: "Judy", content: "문서 정리 완료했습니다." },
  ];

  return (
    <ScrollArea className="h-full w-full p-4 rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="flex flex-col gap-4">
        {chatLogs.map((log) => (
          <ChatItem key={log.id} log={log} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatList;
