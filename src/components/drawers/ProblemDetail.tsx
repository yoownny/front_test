import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Problem } from "@/types/problem/problem";

const difficultyConfig = {
  easy: { icon: "🌱", label: "쉬움" },
  normal: { icon: "⚡", label: "보통" },
  hard: { icon: "🔥", label: "어려움" },
};

interface ProblemDetailProps {
  problem: Problem | null;
  onConfirm: () => void;
}

const ProblemDetail = ({ problem, onConfirm }: ProblemDetailProps) => {
  if (!problem) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 w-1/2">
        <div className="text-center">
          <div className="text-4xl mb-4">사건을 선택하세요</div>
        </div>
      </div>
    );
  }

  const difficultyKey = problem.difficulty.toLowerCase() as keyof typeof difficultyConfig;

  return (
    <div className="w-1/2 overflow-y-auto space-y-4">
      <h2 className="text-xl font-bold">{problem.title}</h2>
      <div className="flex gap-2">
        {[...new Set(problem.genres)].map((g, i) => (
          <Badge key={i} variant="outline">{g}</Badge>
        ))}
      </div>
      <p className="bg-gray-50 p-3 rounded">{problem.content}</p>
      <p className="bg-green-50 p-3 rounded border border-green-200">{problem.answer}</p>
      <div className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t">
        <span>{difficultyConfig[difficultyKey].icon} {difficultyConfig[difficultyKey].label}</span>
      </div>
      <Button className="w-full mt-6" size="lg" onClick={onConfirm}>이 사건 선택</Button>
    </div>
  );
};


export default ProblemDetail;
