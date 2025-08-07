import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  // DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

import PersonSelect from "../selects/PersonSelect";
import TimeSelect from "../selects/TimeSelect";
import ProblemDrawer from "../drawers/ProblemDrawer";

import type { SelectedProblem } from "@/types/problem/problem";
import type { RoomDetailResponse } from "@/types/room/roomDetail";

interface ChangeRoomDialogProps {
  roomInfo: RoomDetailResponse;
  // 웹소켓 전송 함수 추가 필요
}

const ChangeRoomDialog = ({ roomInfo }: ChangeRoomDialogProps) => {
  const [selectedProblem, setSelectedProblem] = useState<SelectedProblem | null>(roomInfo.problemInfo || null);
  const [maxPlayers, setMaxPlayers] = useState<string>(roomInfo.maxPlayers.toString());
  const [timeLimit, setTimeLimit] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isProblemChanged, setIsProblemChanged] = useState(false);

  // 기존 문제 정보와 비교하여 변경 여부 판단
  useEffect(() => {
    if (!selectedProblem) {
      setIsProblemChanged(false);
      return;
    }

    // 제목, 내용, 정답, 좋아요 수 비교
    const origin = roomInfo.problemInfo;
    const changed =
      selectedProblem.title !== origin.title ||
      selectedProblem.content !== origin.content ||
      selectedProblem.answer !== origin.answer ||
      selectedProblem.likes !== origin.likes;
    setIsProblemChanged(changed);
  }, [selectedProblem, roomInfo.problemInfo]);

  // ProblemDrawer에서 선택된 사건 정보 받기
  const handleProblemSelect = (problem: SelectedProblem) => {
    setSelectedProblem(problem);
  };

  // 다이얼로그 닫기 및 상태 초기화
  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedProblem(roomInfo.problemInfo || null);
    setMaxPlayers(roomInfo.maxPlayers.toString());
    setTimeLimit("");
  };

  // 선택된 사건 초기화
  const handleClearProblem = () => {
    setSelectedProblem(null);
  };

  const difficultyConfig = {
    easy: { icon: "🌱", label: "쉬움" },
    normal: { icon: "⚡", label: "보통" },
    hard: { icon: "🔥", label: "어려움" },
  };

  // 설정 완료 버튼 활성화 조건: 문제 정보가 변경된 경우만
  const isUpdateButtonEnabled = isProblemChanged;

  const handleUpdateRoom = () => {
    if (!selectedProblem) {
      alert("문제 정보를 선택해주세요.");
      return;
    }
    // 웹소켓 전송 함수 구현 필요
    // });
    alert(
      `방 정보 변경 완료!\n` +
        `사건: ${selectedProblem.title}\n` +
        `인원: ${roomInfo.maxPlayers}명\n` +
        `방 ID: ${roomInfo.RoomId}`
    );
    handleCloseDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* "맞습니다" 버튼에 props 설정 필요 */}
      {/* <DialogTrigger asChild>
        <Button>사건 파일 변경</Button>
      </DialogTrigger> */}
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>파일 정보 변경</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <PersonSelect value={maxPlayers} readOnly />  // 인원수는 변경 불가
            <TimeSelect value={timeLimit} onValueChange={setTimeLimit} />
          </div>
        </div>

        <div className="bg-muted rounded-md p-4 text-sm">
          {selectedProblem ? (
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-base">
                  {selectedProblem.title}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearProblem}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  ✕
                </Button>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2">
                {selectedProblem.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {difficultyConfig[selectedProblem.difficulty].icon} {difficultyConfig[selectedProblem.difficulty].label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {selectedProblem.problemType === "existing"
                      ? "기존 사건"
                      : "새로운 사건"}
                  </Badge>
                </div>

                {selectedProblem.likes && (
                  <div className="text-xs text-gray-500">
                    👍 {selectedProblem.likes}
                  </div>
                )}
              </div>

              <div className="flex gap-1 flex-wrap">
                {selectedProblem.genres.map((genre, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-1 py-0"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              <p>선택된 사건 정보가 여기에 표시됩니다.</p>
            </div>
          )}
        </div>
        
        {/* 사건 고르기 버튼 */}
        <ProblemDrawer onProblemSelect={handleProblemSelect} />
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={handleCloseDialog}>
            취소
          </Button>
          <Button
            onClick={handleUpdateRoom}
            disabled={!isUpdateButtonEnabled}
            className={!isUpdateButtonEnabled ? "opacity-50 cursor-not-allowed" : ""}
          >
            설정 완료
            {!isUpdateButtonEnabled && (
              <span className="ml-1 text-xs">(문제를 변경하세요)</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoomDialog;
