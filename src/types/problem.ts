// 문제와 관련된 기본 type입니다.
// 전체 문제, 선택된 문제 를 구분합니다.

export type Problem = {
  problemId: number;
  title: string;
  content: string;
  answer: string;
  difficulty: 'easy' | 'normal' | 'hard';
  genres: string[]; // 1~3개
  createdBy: string;
  likes: number;    // 좋아요 수
  problemType: 'existing' | 'custom' | 'ai';
}

// 선택된 문제 전용 interface 입니다.
// 기존 문제, 창작 문제에 모두 사용합니다.
export interface SelectedProblem {
  problemId?: number; // 기존 문제의 경우 problemId 존재함
  title: string;
  content: string;
  answer: string;
  difficulty: 'easy' | 'normal' | 'hard';
  genres: string[];
  createdBy?: string;
  likes?: number;
  problemType: 'existing' | 'custom' | 'ai';
}