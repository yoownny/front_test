import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Send } from 'lucide-react';

const ChatInputBar = () => {
  const [chatInput, setChatInput] = useState("");
  
  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  }

  // 채팅 입력을 바로 채팅창에 띄우는 기능은 추후 Props 및 State 관리에서 작성
  
  return (
    <div className="flex flex-row gap-3 w-full">
      <Input value={chatInput} onChange={onContentChange}/>
      <Button variant="outline"><Send /></Button>
    </div>
  );
};

export default ChatInputBar;
