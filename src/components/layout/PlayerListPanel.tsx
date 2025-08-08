import { Card } from "@/components/ui/card";
import PlayerInfo from "../cards/PlayerInfo";
import type { User } from "@/types/user";
import useRoomStore from "@/stores/roomStore";

const PlayerListPanel = () => {
  const players = useRoomStore((state) => state.players);
  const maxPositions = 6;

  const paddedList: User[] = [
    ...players,
    ...Array(maxPositions - players.length)
      .fill(null)
      .map((_, index) => ({
        id: -index - 1, // 음수로 임시 고유 id
        name: "",
        isHost: false,
        status: "READY",
      })),
  ];

  return (
    <Card className="p-4 grid grid-flow-row-dense grid-cols-2 auto-rows-auto">
      {paddedList.map((user) => (
        <PlayerInfo key={user.id} user={user} />
      ))}
    </Card>
  );
};

export default PlayerListPanel;
