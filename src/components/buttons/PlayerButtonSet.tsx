import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useRoomStore from "@/stores/roomStore";
import useUserStore from "@/stores/userStore";
import { sendReady } from "@/websocket/sender";

const PlayerButtonSet = () => {
  const players = useRoomStore((state) => state.players);
  const myUserId = useUserStore(state => state.userId);

  const isReady = players.find((player) => player.id === myUserId)?.status === "READY";
  
  const onToggleReady = () => {
    sendReady(0, !isReady);
  };

  return (
    <Card className="p-6 grid grid-rows-2 gap-8">
      <span className="text-[20px] text-center self-center">
        모든 플레이어가 준비해야 게임을 시작할 수 있습니다.
      </span>
      <Button
        variant="outline"
        className="h-full text-[24px]"
        onClick={onToggleReady}
      >
        {isReady ? "게임 준비" : "준비 취소"}
      </Button>
    </Card>
  );
};

export default PlayerButtonSet;
