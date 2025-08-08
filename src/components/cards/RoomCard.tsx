import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import type { RoomSummary } from "@/types/room/roomSummary";

interface RoomCardProps {
  room: RoomSummary;
  onClick: (roomId: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  // [대기중] 상태만 클릭하도록 제어
  const handleClick = () => {
    if (room.gameState === "WAITING") {
      onClick(room.roomId);
    }
  };

  // 난이도 구분
  const difficultyConfig = {
    EASY: {
      icon: "🌱",
      color: "bg-green-100 text-green-800",
      label: "🌱 쉬움",
    },
    NORMAL: {
      icon: "⚡",
      color: "bg-yellow-100 text-yellow-800",
      label: "⚡ 보통",
    },
    HARD: {
      icon: "🔥",
      color: "bg-orange-100 text-orange-800",
      label: "🔥 어려움",
    },
  };

  // 게임방 상태 구분
  const gameStateConfig = {
    "WAITING": {
      icon: "🟢",
      color: "bg-blue-100 text-blue-800",
      label: "🟢 대기 중",
    },
    "IN_GAME": {
      icon: "🔴",
      color: "bg-red-100 text-red-800",
      label: "🔴 수사 중",
    },
  };

  return (
    <Card
      className="w-full max-w-sm cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={handleClick}
    >
      <CardHeader>
        {/* 방 번호 */}
        <CardDescription className="flex flex-wrap gap-1 text-xs text-muted-foreground right-2">
          사건번호 #{room.roomId}
          {/* 방 상태 : 대기 중, 게임 중 */}
          {/* 이후 뱃지 -> 테두리 색상으로 변경 */}
          <Badge
            variant="secondary"
            className={gameStateConfig[room.gameState].color}
          >
            {gameStateConfig[room.gameState].label}
          </Badge>
        </CardDescription>

        {/* 인원수, 제한시간 표시 */}
        <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-1">
            <Users className="w-3 h-3" />
            <span className="w-3 h-3">
              {room.currentPlayers}/{room.maxPlayers}명
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <Clock className="w-3 h-3" />
            <span className="w-3 h-3">{room.timeLimit}분</span>
          </div>
          <Badge
            variant="secondary"
            className={difficultyConfig[room.difficulty].color}
          >
            {difficultyConfig[room.difficulty].label}
          </Badge>

          <Badge variant="secondary">
            {room.problemType === "ORIGINAL" ? "기존 사건" : "새로운 사건"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="bg-muted rounded-md p-3 text-sm font-semibold truncate">
          {room.title}
        </div>

        {/* 장르태그 1~3개 */}
        {room.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t">
            {room.genres.slice(0, 3).map((genre, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
            {room.genres.length > 3 && (
              <Badge variant="outline" className="text-xs">
                + {room.genres.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {/* 호스트 정보 */}
        <div className="text-xs text-muted-foreground pt-1">
          시니어 탐정: {room.hostName}
        </div>s
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
