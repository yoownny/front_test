import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
// import useRoomStore from "@/stores/roomStore";
import { sendChat } from "@/websocket/sender";

const ChatInputBar = () => {
  // const roomId = useRoomStore(state => state.roomId);
  const [chatInput, setChatInput] = useState("");

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  // 채팅 추가 시 Logic
  const onAddChat = () => {
    const chatContent = chatInput.trim();
    if (chatContent !== "") {
      // sendChat(roomId, chatContent);
      sendChat(0, chatContent);
      setChatInput("");
    }
  };

  // 엔터 키를 누를 때도 제출
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      onAddChat();
    }
  };

  return (
    <div className="flex flex-row gap-3 w-full">
      <Input
        value={chatInput}
        onChange={onContentChange}
        onKeyDown={onKeyDown}
      />
      <Button variant="outline" className="cursor-pointer" onClick={onAddChat}>
        <Send />
      </Button>
    </div>
  );
};

export default ChatInputBar;
