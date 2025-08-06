import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";
import { Crown } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface PlayerInfoProps {
  user: User;
}

const PlayerInfo = ({ user }: PlayerInfoProps) => {

  // 방장 넘기기 Logic 작성
  const onTransferRequest = async () => {

  }

  return (
    <ContextMenu>
      {/* card part */}
      <ContextMenuTrigger>
        <Card className="p-4 min-h-20 flex flex-row justify-between items-center">
          <span>{user.name}</span>
          <div className="flex items-center gap-2">
            {user.isHost && (
              <Crown className="w-5 h-5 text-yellow-500" />
            )}
            {user.isReady && (
              <CircleCheckBig className="w-5 h-5 text-green-500" />
            )}
          </div>
        </Card>
      </ContextMenuTrigger>

      {/* trigger part */}
      <ContextMenuContent>
        <ContextMenuItem>
          방장 넘기기
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PlayerInfo;
