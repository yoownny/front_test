import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DifficultySelect from "@/components/selects/DifficultySelect";
import GenreSelectionGroup from "@/components/selects/GenreSelectGroup";
import type { SelectedProblem } from "@/types/problem/problem";

interface CustomProblemFormProps {
  onSubmit: (problem: SelectedProblem) => void;
}

const CustomProblemForm = ({ onSubmit }: CustomProblemFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState<'EASY' | 'NORMAL' | 'HARD'>("NORMAL");
  const [genres, setGenres] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !answer.trim() || genres.length === 0) return;
    onSubmit({
      title, content, answer, difficulty, genres,
      problemType: "CUSTOM",
      createdBy: "현재 사용자"
    });
    setTitle(""); setContent(""); setAnswer(""); setGenres([]);
  };

  return (
    <div className="space-y-4 pb-6">
      <Input placeholder="사건 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="사건 내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <Textarea placeholder="정답" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <div className="flex items-center gap-2">
        <DifficultySelect value={difficulty} onValueChange={setDifficulty} />
        <GenreSelectionGroup selectedGenres={genres} onGenreChange={setGenres} required />
      </div>
      <Button className="w-full" onClick={handleSubmit} disabled={!title || !content || !answer || genres.length === 0}>
        사건 작성 완료
      </Button>
    </div>
  );
};

export default CustomProblemForm;
