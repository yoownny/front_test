import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatList from "../chat/ChatList";
import ChatInputBar from "../chat/ChatInputBar";

const GameRoomChatSection = () => {
  // 현재 Component는 임시로 너비와 높이를 고정해 사용하였습니다.
  // 추후 Grid를 통해 조정할 계획입니다.
  return (
    <Card className="max-h-[700px] p-4 h-full g-4">
      <CardHeader className="bg-muted-foreground h-20 text-background flex items-center">
        <CardTitle className="text-[36px] font-bold"></CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full overflow-y-auto">
        <ChatList />
      </CardContent>
      <CardFooter className="p-0">
        <ChatInputBar />
      </CardFooter>
    </Card>
  );
};

export default GameRoomChatSection;
