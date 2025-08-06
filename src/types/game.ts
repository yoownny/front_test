// 해당 타입은 UI 사용 및 Props를 위한 FE Custom Type입니다.
// 실제 타입은 BE API 응답에 따라 결정됩니다.

// 사용자의 질문 및 응답에 대한 구조입니다. type으로 분류됩니다.
export interface Interaction {
  id: number;
  type: "question" | "answer";
  player: string;
  content: string;
  status: string;
};

export interface Reply {
  id: number;
  type: string;
  player_id: number;
  button_value: string;
};
