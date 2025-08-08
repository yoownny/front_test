import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";
import { Crown } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface PlayerInfoProps {
  user: User;
}

const PlayerInfo = ({ user }: PlayerInfoProps) => {
  // 방장 넘기기 Logic 작성
  const onTransferRequest = async () => {};

  // Player의 현 상태에 따른 Icon 표시
  const playerStatusIcon = (user: User) => {
    if (user.name !== "") {
      return (
        <div>
          {user.isHost && <Crown className="w-5 h-5 text-yellow-500" />}
          {user.status === "READY" && (
            <CircleCheckBig className="w-5 h-5 text-green-500" />
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <ContextMenu>
      {/* card part */}
      <ContextMenuTrigger>
        <Card className="p-4 min-h-20 flex flex-row justify-between items-center">
          <span>{user.name}</span>
          <div className="flex items-center gap-2">
            {playerStatusIcon(user)}
          </div>
        </Card>
      </ContextMenuTrigger>
      {/* trigger part */}
      <ContextMenuContent>
        <ContextMenuItem onClick={onTransferRequest}>
          방장 넘기기
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PlayerInfo;
