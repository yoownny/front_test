import { Alert, AlertTitle } from "@/components/ui/alert";
import type { Log } from "@/types/user";

interface ChatItemProps {
  log: Log;
}

const ChatItem = ({ log }: ChatItemProps) => {
  function msgAlignType(userType: string): string {
    switch (userType) {
      case "System":
        return "mx-auto";
      case "Craftor":
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

