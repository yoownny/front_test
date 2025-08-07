import { Alert, AlertTitle } from "@/components/ui/alert";
import useUserStore from "@/stores/userStore";
import type { ChatLog } from "@/types/chat";

interface ChatItemProps {
  log: ChatLog;
}

const ChatItem = ({ log }: ChatItemProps) => {
  const myName = useUserStore(state => state.userName);

  function msgAlignType(userType: string): string {
    switch (userType) {
      case "system":
        return "mx-auto";
      case myName:
        return "ml-auto";
      default:
        return "mr-auto";
    }
  }

  return (
    <Alert className={`h-8 items-center p-2 w-fit rounded-full ${msgAlignType(log.user)}`}>
      <AlertTitle className="font-bold">{log.content}</AlertTitle>
    </Alert>
  );
};

export default ChatItem;

