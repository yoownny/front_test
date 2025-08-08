import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DifficultySelect from "@/components/selects/DifficultySelect";
import GenreSelectionGroup from "@/components/selects/GenreSelectGroup";
import type { SelectedProblem } from "@/types/problem/problem";
import { apiClient } from "@/services/api/apiClient";
import { useAuthStore } from "@/stores/authStore";

interface CustomProblemFormProps {
  onSubmit: (problem: SelectedProblem) => void;
}

const CustomProblemForm = ({ onSubmit }: CustomProblemFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"EASY" | "NORMAL" | "HARD">(
    "EASY"
  );

  const { user } = useAuthStore();

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const payload = {
      title,
      content,
      answer,
      genres,
      difficulty,
      creator: {
        id: user.userId,
        nickname: user.nickname,
      },
    };

    try {
      const createdProblem = await apiClient.post<SelectedProblem>(
        "/problems/memory",
        payload
      );
      onSubmit({ ...createdProblem, problemType: "CUSTOM" });
    } catch (error) {
      console.error("문제 생성 실패:", error);
      alert("문제 생성에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-4 pb-6">
      <Input
        placeholder="사건 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="사건 내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Textarea
        placeholder="정답"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <DifficultySelect value={difficulty} onValueChange={setDifficulty} />
        <GenreSelectionGroup
          selectedGenres={genres}
          onGenreChange={setGenres}
          required
        />
      </div>
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!title || !content || !answer || genres.length === 0}
      >
        사건 작성 완료
      </Button>
    </div>
  );
};

export default CustomProblemForm;
