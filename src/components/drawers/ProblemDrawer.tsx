import { useState } from "react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

import DifficultyFilter from "@/components/filters/DifficultyFilter";
import GenreFilter from "@/components/filters/GenreFilter";
import SearchFilter from "@/components/filters/SearchFilter";

import DifficultySelect from "@/components/selects/DifficultySelect";
import GenreSelectionGroup from "../selects/GenreSelectGroup";

import type { Problem, SelectedProblem } from "@/types/problem";

import { useFilter } from "@/hooks/useFilter";
import type { FilterState } from "@/types/filter";


interface ProblemDrawerProps {
  onProblemSelect: (problem: SelectedProblem) => void;
}

const problemFilterFunction = (
  problem: Problem,
  filters: FilterState
): boolean => {
  // 난이도 필터
  if (
    filters.difficulties.length > 0 &&
    !filters.difficulties.includes(problem.difficulty)
  ) {
    return false;
  }

  // 장르 필터
  if (filters.genres.length > 0) {
    const hasMatchingGenre = problem.genres.some((tag) =>
      filters.genres.includes(tag)
    );
    if (!hasMatchingGenre) return false;
  }

  // 검색어 필터
  if (filters.searchQuery.trim() !== "") {
    const query = filters.searchQuery.toLowerCase();
    const searchableText = [problem.title, problem.content, ...problem.genres]
      .join(" ")
      .toLowerCase();

    if (!searchableText.includes(query)) return false;
  }

  return true;
};

// 예시 문제
const mockProblems: Problem[] = [
  {
    problemId: 1,
    title: "도서관의 비밀",
    content:
      "한 대학교 도서관에서 매일 밤 이상한 소리가 들린다. 경비원은 아무것도 보지 못했다고 하는데...",
    answer:
      "도서관 지하에 숨겨진 비밀 통로가 있었고, 그곳을 이용하는 학생이 있었다.",
    difficulty: "normal",
    genres: ["공포", "괴담"],
    createdBy: "관리자",
    likes: 25,
    problemType: "existing",
  },
  {
    problemId: 2,
    title: "사라진 반지",
    content:
      "결혼식 전날, 신부의 할머니 반지가 갑자기 사라졌다. 집에는 가족들만 있었는데...",
    answer: "강아지가 반지를 물고 정원에 묻어놓았다.",
    difficulty: "easy",
    genres: ["일상", "미스터리"],
    createdBy: "관리자",
    likes: 42,
    problemType: "existing",
  },
  {
    problemId: 3,
    title: "밤의 카페",
    content:
      "24시간 카페에서 일하는 직원이 매일 새벽 3시마다 이상한 손님을 본다고 한다...",
    answer: "그 손님은 실제로는 옆 건물에서 일하는 야간 근무자였다.",
    difficulty: "hard",
    genres: ["공포", "추리"],
    createdBy: "관리자",
    likes: 18,
    problemType: "existing",
  },
  {
    problemId: 4,
    title: "학교 괴담의 진실",
    content:
      "한 고등학교에서 밤마다 3층 화장실에서 이상한 소리가 들린다는 소문이 돌고 있다...",
    answer:
      "화장실 환풍기가 고장나서 바람에 의해 문이 저절로 열리고 닫히고 있었다.",
    difficulty: "easy",
    genres: ["공포", "괴담"],
    createdBy: "사용자A",
    likes: 33,
    problemType: "custom",
  },
  {
    problemId: 5,
    title: "회사의 수상한 사건",
    content:
      "매주 금요일마다 사무실에서 누군가의 도시락이 사라진다. CCTV에는 아무것도 찍히지 않았는데...",
    answer:
      "청소부 아주머니가 퇴근 시간 이후에 남은 도시락을 치우면서 실수로 가져가고 있었다.",
    difficulty: "normal",
    genres: ["일상", "추리"],
    createdBy: "사용자B",
    likes: 15,
    problemType: "custom",
  },
  {
    problemId: 6,
    title: "사라진 고양이의 수수께끼",
    content:
      "아파트 단지에서 길고양이들이 하나둘씩 사라지고 있다. 주민들은 걱정이 태산같다...",
    answer:
      "동물보호소에서 중성화 수술을 위해 포획 후 방사하고 있었지만, 공지가 제대로 되지 않았다.",
    difficulty: "hard",
    genres: ["동물", "미스터리"],
    createdBy: "사용자C",
    likes: 67,
    problemType: "existing",
  },
];

const ProblemDrawer = ({ onProblemSelect }: ProblemDrawerProps) => {
  const {
    filters,
    filteredData: filteredProblems,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  } = useFilter({
    data: mockProblems,
    filterFunction: problemFilterFunction,
  });

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 창작문제 state
  const [customProblem, setCustomProblem] = useState({
    title: "",
    content: "",
    answer: "",
    difficulty: "normal" as "easy" | "normal" | "hard",
    genres: [] as string[],
    genreSelections: ["", "", ""] as string[],
  });

  // 난이도 설정
  const difficultyConfig = {
    easy: { icon: "🌱", label: "쉬움" },
    normal: { icon: "⚡", label: "보통" },
    hard: { icon: "🔥", label: "어려움" },
  };

  // 선택한 문제 설정하기
  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
  };

  // 기존문제 선택 확인
  const handleConfirmExistingSelection = () => {
    if (selectedProblem) {
      const selectedData: SelectedProblem = {
        problemId: selectedProblem.problemId,
        title: selectedProblem.title,
        content: selectedProblem.content,
        answer: selectedProblem.answer,
        difficulty: selectedProblem.difficulty,
        genres: selectedProblem.genres,
        problemType: "existing",
        createdBy: selectedProblem.createdBy,
        likes: selectedProblem.likes,
      };

      onProblemSelect(selectedData);
      setIsOpen(false);
      setSelectedProblem(null);
    }
  };

  // 창작문제 
  const handleCustomProblemSubmit = () => {
    if (
      !customProblem.title.trim() ||
      !customProblem.content.trim() ||
      !customProblem.answer.trim()
    ) {
      alert("제목, 내용, 정답을 모두 입력해주세요.");
      return;
    }

    if (customProblem.difficulty.length === 0) {
      alert("난이도를 선택해주세요.");
      return;
    }

    if (customProblem.genres.length === 0) {
      alert("최소 1개의 장르를 선택해주세요.");
      return;
    }

    const customData: SelectedProblem = {
      title: customProblem.title.trim(),
      content: customProblem.content.trim(),
      answer: customProblem.answer.trim(),
      difficulty: customProblem.difficulty,
      genres: customProblem.genres, // 실제 선택된 장르만 전달
      problemType: "custom",
      createdBy: "현재 사용자", // 추후 로그인한 사용자 닉네임으로 변경
    };

    onProblemSelect(customData);
    setIsOpen(false);

    // 폼 초기화
    setCustomProblem({
      title: "",
      content: "",
      answer: "",
      difficulty: "normal",
      genres: [],
      genreSelections: ["", "", ""],
    });
  };

  // 새로운 사건 폼 업데이트
  const updateTitle = (title: string) => {
    setCustomProblem(prev => ({ ...prev, title }));
  };

  const updateContent = (content: string) => {
    setCustomProblem(prev => ({ ...prev, content }));
  };

  const updateAnswer = (answer: string) => {
    setCustomProblem(prev => ({ ...prev, answer }));
  };

  const updateDifficulty = (difficulty: 'easy' | 'normal' | 'hard') => {
    setCustomProblem(prev => ({ ...prev, difficulty }));
  };

  const updateGenres = (genres: string[]) => {
    setCustomProblem(prev => ({ ...prev, genres }));
  };

  const updateGenreSelections = (genreSelections: string[]) => {
    setCustomProblem(prev => ({ ...prev, genreSelections }));
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">사건 고르기</Button>
      </DrawerTrigger>

      <DrawerContent className="h-[90%] px-6 py-4">
        <DrawerHeader>
          <DrawerTitle>사건 고르기</DrawerTitle>
        </DrawerHeader>

        <Tabs defaultValue="existing" className="mt-4 w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">기존 사건</TabsTrigger>
            <TabsTrigger value="custom">새로운 사건</TabsTrigger>
          </TabsList>

          {/* 왼쪽 탭: 기존문제 */}
          <TabsContent value="existing" className="h-full mt-4">
            <div className="flex h-full gap-4">
              {/* Left: 검색, 필터, 문제 목록 */}
              <div className="w-1/2 border-r pr-4 overflow-y-auto space-y-4">
                {/* 검색 칸 */}
                <SearchFilter
                  searchQuery={filters.searchQuery}
                  onSearchChange={(query) => updateFilter("searchQuery", query)}
                  placeholder="사건 검색"
                />
                <div className="flex gap-2 items-center flex-wrap">
                  <div className="flex gap-2">
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
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      className="text-xs h-8"
                      onClick={clearFilters}
                    >
                      전체 해제
                    </Button>
                  )}
                </div>

                {/* 문제 리스트 */}
                <ScrollArea className="space-y-2">
                  {filteredProblems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">🔍</div>
                      <p className="text-sm">조건에 맞는 사건이 없습니다</p>
                    </div>
                  ) : (
                    filteredProblems.map((problem) => (
                      <div
                        key={problem.problemId}
                        className={`p-3 border rounded cursor-pointer transition-colors ${
                          selectedProblem?.problemId === problem.problemId
                            ? "bg-green-50 border-green-300"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleProblemSelect(problem)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-sm">
                            {problem.title}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>👍 {problem.likes}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {difficultyConfig[problem.difficulty].icon}{" "}
                            {difficultyConfig[problem.difficulty].label}
                          </span>
                          <span>/</span>
                          <span>{problem.genres.join(", ")}</span>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex gap-1">
                            {problem.genres.slice(0, 2).map((genre, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs px-1 py-0"
                              >
                                {genre}
                              </Badge>
                            ))}
                            {problem.genres.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs px-1 py-0"
                              >
                                +{problem.genres.length - 2}
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {problem.problemType === "existing"
                              ? "기존"
                              : "창작"}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </div>

              {/* Right: 문제 상세 */}
              <div className="w-1/2 overflow-y-auto">
                {selectedProblem ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold">
                        {selectedProblem.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>👍 {selectedProblem.likes}</span>
                        <Badge variant="outline">
                          {selectedProblem.problemType === "existing"
                            ? "기존 사건"
                            : "창작 사건"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {selectedProblem.genres.map((genre, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">
                          사건 내용
                        </h3>
                        <p className="text-sm leading-relaxed bg-gray-50 p-3 rounded">
                          {selectedProblem.content}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">정답</h3>
                        <p className="text-sm leading-relaxed bg-green-50 p-3 rounded border border-green-200">
                          {selectedProblem.answer}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t">
                      <span>
                        난이도:{" "}
                        {difficultyConfig[selectedProblem.difficulty].icon}{" "}
                        {difficultyConfig[selectedProblem.difficulty].label}
                      </span>
                      <span>작성자: {selectedProblem.createdBy}</span>
                    </div>

                    <Button
                      className="w-full mt-6"
                      size="lg"
                      onClick={handleConfirmExistingSelection}
                    >
                      이 사건 선택
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-4">사건을 선택하세요</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 오른쪽 탭: 창작문제 */}
          <TabsContent
            value="custom"
            className="pt-4 space-y-4 h-full overflow-y-auto"
          >

            <div className="space-y-4 pb-6">
              <Input
                placeholder="사건 제목을 입력하세요."
                value={customProblem.title}
                onChange={(e) => updateTitle(e.target.value)}
              />

              <Textarea
                placeholder="사건 내용을 입력하세요. (상황 설명)"
                className="min-h-24"
                value={customProblem.content}
                onChange={(e) => updateContent(e.target.value)}
              />

              <Textarea
                placeholder="정답을 입력하세요. (사건의 전말)"
                className="min-h-24"
                value={customProblem.answer}
                onChange={(e) => updateAnswer(e.target.value)}
              />

              <div className="flex items-center gap-2">
                <DifficultySelect
                  value={customProblem.difficulty}
                  onValueChange={updateDifficulty}
                />
                {/* 장르 select 3개 중 1개 이상 반드시 선택 */}
                {/* 3개 장르 Select 그룹 */}
                <GenreSelectionGroup
                  selectedGenres={customProblem.genreSelections || ["", "", ""]}
                  onGenreChange={(genres) => {
                    updateGenres(genres);

                    const genreSelections = ["", "", ""];
                    genres.forEach((genre, index) => {
                      if (index < 3) genreSelections[index] = genre;
                    });
                    updateGenreSelections(genreSelections);
                  }}
                  required={true}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleCustomProblemSubmit}
                disabled={
                  !customProblem.title.trim() ||
                  !customProblem.content.trim() ||
                  !customProblem.answer.trim() ||
                  customProblem.genres.length === 0 // 최소 1개 장르 선택 필수
                }
              >
                사건 작성 완료
                {customProblem.genres.length === 0 && (
                  <span className="ml-2 text-xs opacity-75">
                    (장르 선택 필요)
                  </span>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};

export default ProblemDrawer;
