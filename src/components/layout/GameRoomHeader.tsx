import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import useRoomStore from "@/stores/roomStore";
import useProblemStore from "@/stores/problemStore";

const GameRoomHeader = () => {
  const roomTitle = useProblemStore(state => state.title);
  const leaveRoom = useRoomStore(state => state.resetRoom);
  const navigate = useNavigate();

  const onLeaveRoom = async () => {
    try {
      // 추후 방 나가기 UI 개선 코드 작성 예정
      // await leaveRoomAPI(roomId);
      leaveRoom();
      navigate("/lobby");
    } catch {
      alert("방 나가기에 실패하였습니다.");
    }
  }

  return (
    <Card
      className="p-3 px-5 rounded-none
      flex flex-row justify-between items-center"
    >
      <span className="text-[24px]">{roomTitle}</span>
      <LogOut
        role="button"
        size={20}
        onClick={onLeaveRoom}
        className="cursor-pointer"
      />
    </Card>
  );
};

export default GameRoomHeader;
