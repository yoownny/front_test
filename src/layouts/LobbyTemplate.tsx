import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/cards/RoomCard";
import CreateRoomDialog from "@/components/dialogs/CreateRoomDialog";
import DifficultyFilter from "@/components/filters/DifficultyFilter";
import GenreFilter from "@/components/filters/GenreFilter";
import ProblemFilter from "@/components/filters/ProblemFilter";
import SearchFilter from "@/components/filters/SearchFilter";
import logo from "@/assets/logo_title_black.png";
import type { RoomSummary } from "@/types/room/roomSummary";
import { useRoomFilter } from "@/hooks/useRoomFilter";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "@/stores/userStore";
import { LogOut } from "lucide-react";

// 테스트용 방 정보
const mockRooms: RoomSummary[] = [
  {
    roomId: 1,
    title: "비 오는 밤의 살인사건",
    currentPlayers: 3,
    maxPlayers: 6,
    gameState: "waiting",
    problemType: "ORIGINAL",
    genres: ["스릴러", "범죄"],
    difficulty: "NORMAL",
    timeLimit: 15,
    hostName: "탐정김",
  },
  {
    roomId: 2,
    title: "도서관의 비밀",
    currentPlayers: 2,
    maxPlayers: 4,
    gameState: "waiting",
    problemType: "CUSTOM",
    genres: ["미스터리", "판타지"],
    difficulty: "EASY",
    timeLimit: 10,
    hostName: "셜록홈즈",
  },
  {
    roomId: 3,
    title: "사라진 다이아몬드",
    currentPlayers: 4,
    maxPlayers: 4,
    gameState: "in_game",
    problemType: "ORIGINAL",
    genres: ["추리"],
    difficulty: "HARD",
    timeLimit: 15,
    hostName: "명탐정코난",
  },
  {
    roomId: 4,
    title: "카페의 수상한 손님",
    currentPlayers: 1,
    maxPlayers: 3,
    gameState: "waiting",
    problemType: "CUSTOM",
    genres: ["일상"],
    difficulty: "EASY",
    timeLimit: 12,
    hostName: "추리왕",
  },
  {
    roomId: 5,
    title: "학교 괴담의 진실",
    currentPlayers: 5,
    maxPlayers: 6,
    gameState: "in_game",
    problemType: "ORIGINAL",
    genres: ["공포"],
    difficulty: "HARD",
    timeLimit: 15,
    hostName: "고스트헌터",
  },
  {
    roomId: 6,
    title: "회사 기밀 유출 사건",
    currentPlayers: 3,
    maxPlayers: 5,
    gameState: "in_game",
    problemType: "ORIGINAL",
    genres: ["스릴러"],
    difficulty: "NORMAL",
    timeLimit: 13,
    hostName: "비즈니스탐정",
  },
];

const LobbyTemplate = () => {
  const {
    filters,
    filteredData: filteredRooms,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  } = useRoomFilter(mockRooms);

  const navigate = useNavigate();

  const handleRoomClick = (roomId: number) => {
    console.log(`방 ${roomId}번에 입장 시도`);

    // 웹소켓 sender 보내는 함수 자리
    // sender를 보내면 상태 변경하는 걸로 끝남. navigate 해줘야함

    navigate(`/room/${roomId}`);
  };

  const { userId } = useUserStore();

  const onLeave = () => {
    try {
      navigate("/");
    } catch {
      alert("홈으로 나가기에 실패하였습니다.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      {/* 좌측: 방 목록 (3/4 너비) */}
      <div className="lg:col-span-3 bg-white rounded-lg border p-6 ">
        <div className="flex justify-between items-center mb-6 flex-row">
          <h2 className="text-2xl font-bold text-gray-900">사건 파일 목록</h2>
          <Button
            onClick={onLeave}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            홈으로
            <LogOut size={20} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-320px)]">
          {filteredRooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">
                검색 결과가 없습니다.
              </h3>
              <p className="text-sm text-center">
                {hasActiveFilters
                  ? "다른 필터 조건을 시도해보세요."
                  : "현재 진행 중인 사건이 없습니다."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.roomId}
                  room={room}
                  onClick={handleRoomClick}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* 우측: 검색 + 필터 + 액션 (1/4 너비) */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900">검색 & 필터</h3>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            모든 필터 해제
          </Button>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">검색</h4>
          <SearchFilter
            searchQuery={filters.searchQuery}
            onSearchChange={(query) => updateFilter("searchQuery", query)}
            placeholder="사건 제목, 장르, 탐정 이름으로 검색..."
          />
        </div>

        {/* 필터 */}
        <div className="space-y-4">
          <DifficultyFilter
            selectedDifficulties={filters.difficulties}
            onDifficultyChange={(difficulties) =>
              updateFilter("difficulties", difficulties)
            }
          />

          <GenreFilter
            selectedGenres={filters.genres}
            onGenreChange={(genres) => updateFilter("genres", genres)}
          />

          <ProblemFilter
            selectedProblemTypes={filters.problemTypes}
            onProblemTypeChange={(problemTypes) =>
              updateFilter("problemTypes", problemTypes)
            }
          />
        </div>

        {/* 방만들기, 프로필 보기 */}
        <div className="text-center gap-4">
          <CreateRoomDialog />
          <Link to={`/users/${userId}`}>
            <Button variant="outline" className="space-y-4">
              내 프로필 보기
            </Button>
          </Link>
        </div>

        {/* 필터 상태 표시 */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              활성 필터
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              {filters.difficulties.length > 0 && (
                <div>난이도: {filters.difficulties.join(", ")}</div>
              )}
              {filters.genres.length > 0 && (
                <div>장르: {filters.genres.join(", ")}</div>
              )}
              {filters.problemTypes.length > 0 && (
                <div>
                  유형:{" "}
                  {filters.problemTypes
                    .map((type) =>
                      type === "ORIGINAL" ? "기존 사건" : "새로운 사건"
                    )
                    .join(", ")}
                </div>
              )}
              {filters.searchQuery && <div>검색: "{filters.searchQuery}"</div>}
            </div>
            )
          </div>
        )}

        <div className="text-center">
          <img src={logo} alt="로고" className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default LobbyTemplate;
