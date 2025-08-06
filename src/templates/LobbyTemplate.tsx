import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/cards/RoomCard";
import CreateRoomDialog from "@/components/dialogs/CreateRoomDialog";
import DifficultyFilter from "@/components/filters/DifficultyFilter";
import GenreFilter from "@/components/filters/GenreFilter";
import ProblemFilter from "@/components/filters/ProblemFilter";
import SearchFilter from "@/components/filters/SearchFilter";
import logo from "@/assets/logo.png";
import type { RoomSummary } from "@/types/roomSummary";
import { useRoomFilter } from "@/hooks/useRoomFilter";
import { useNavigate } from "react-router-dom";

// 테스트용 방 정보
const mockRooms: RoomSummary[] = [
  {
    id: 1,
    title: "비 오는 밤의 살인사건",
    currentPlayers: 3,
    maxPlayers: 6,
    gameState: "waiting",
    problemType: "existing",
    genres: ["스릴러", "범죄"],
    difficulty: "normal",
    timeLimit: 15,
    hostName: "탐정김",
  },
  {
    id: 2,
    title: "도서관의 비밀",
    currentPlayers: 2,
    maxPlayers: 4,
    gameState: "waiting",
    problemType: "custom",
    genres: ["미스터리", "판타지"],
    difficulty: "easy",
    timeLimit: 10,
    hostName: "셜록홈즈",
  },
  {
    id: 3,
    title: "사라진 다이아몬드",
    currentPlayers: 4,
    maxPlayers: 4,
    gameState: "in_game",
    problemType: "existing",
    genres: ["추리"],
    difficulty: "hard",
    timeLimit: 15,
    hostName: "명탐정코난",
  },
  {
    id: 4,
    title: "카페의 수상한 손님",
    currentPlayers: 1,
    maxPlayers: 3,
    gameState: "waiting",
    problemType: "custom",
    genres: ["일상"],
    difficulty: "easy",
    timeLimit: 12,
    hostName: "추리왕",
  },
  {
    id: 5,
    title: "학교 괴담의 진실",
    currentPlayers: 5,
    maxPlayers: 6,
    gameState: "in_game",
    problemType: "existing",
    genres: ["공포"],
    difficulty: "hard",
    timeLimit: 15,
    hostName: "고스트헌터",
  },
  {
    id: 6,
    title: "회사 기밀 유출 사건",
    currentPlayers: 3,
    maxPlayers: 5,
    gameState: "in_game",
    problemType: "existing",
    genres: ["스릴러"],
    difficulty: "normal",
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
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      {/* 좌측: 방 목록 (3/4 너비) */}
      <div className="lg:col-span-3 bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">사건 파일 목록</h2>
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
                <RoomCard key={room.id} room={room} onClick={handleRoomClick} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* 우측: 검색 + 필터 + 액션 (1/4 너비) */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="text-center">
          <img src={logo} alt="로고" className="w-32 h-32 mx-auto mb-4" />
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

        {/* 검색바 - 우측 상단에 위치 */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">검색</h4>
          <SearchFilter
            searchQuery={filters.searchQuery}
            onSearchChange={(query) => updateFilter("searchQuery", query)}
            placeholder="사건 제목, 장르, 탐정 이름으로 검색..."
          />
        </div>

        {/* 필터들 */}
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

        {/* 방만들기 버튼 */}
        <div className="pt-4 border-t">
          <CreateRoomDialog />
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
                      type === "existing" ? "기존 사건" : "새로운 사건"
                    )
                    .join(", ")}
                </div>
              )}
              {filters.searchQuery && <div>검색: "{filters.searchQuery}"</div>}
            </div>
            )
          </div>
        )}
      </div>
    </div>
  );
};

export default LobbyTemplate;
