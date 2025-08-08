import type { ChatLog } from "./types/chat";
import { AnswerStatus, type Interaction } from "./types/game/game";
import type { Problem } from "./types/problem/problem";
import type { RoomDetailResponse } from "./types/room/roomDetail";

export const mockDataChatLogs: ChatLog[] = [
  {
    id: 0,
    user: "system",
    content: "Craftor님이 방에 입장했습니다.",
    timestamp: "2025-08-04T09:00:00Z",
  },
  {
    id: 1,
    user: "Craftor",
    content: "안녕하세요!",
    timestamp: "2025-08-04T09:01:00Z",
  },
  {
    id: 2,
    user: "Alice",
    content: "좋은 아침입니다!",
    timestamp: "2025-08-04T09:02:00Z",
  },
  {
    id: 3,
    user: "Bob",
    content: "오늘 회의는 몇 시인가요?",
    timestamp: "2025-08-04T09:03:00Z",
  },
  {
    id: 4,
    user: "Charlie",
    content: "방금 코드를 푸시했습니다.",
    timestamp: "2025-08-04T09:04:00Z",
  },
  {
    id: 5,
    user: "Dana",
    content: "점심 메뉴 추천해주세요.",
    timestamp: "2025-08-04T09:05:00Z",
  },
  {
    id: 6,
    user: "system",
    content: "게임이 곧 시작됩니다. 준비해주세요!",
    timestamp: "2025-08-04T09:06:00Z",
  },
  {
    id: 7,
    user: "Eve",
    content: "버그를 수정했어요!",
    timestamp: "2025-08-04T09:07:00Z",
  },
  {
    id: 8,
    user: "Craftor",
    content: "리뷰 완료했습니다.",
    timestamp: "2025-08-04T09:08:00Z",
  },
  {
    id: 9,
    user: "Grace",
    content: "새로운 기능 아이디어가 있어요.",
    timestamp: "2025-08-04T09:09:00Z",
  },
  {
    id: 10,
    user: "Heidi",
    content: "배포는 오늘 오후입니다.",
    timestamp: "2025-08-04T09:10:00Z",
  },
  {
    id: 11,
    user: "Ivan",
    content: "API 응답이 느린 것 같아요.",
    timestamp: "2025-08-04T09:11:00Z",
  },
  {
    id: 12,
    user: "Judy",
    content: "문서 정리 완료했습니다.",
    timestamp: "2025-08-04T09:12:00Z",
  },
  {
    id: 13,
    user: "Craftor",
    content: "안녕하세요!",
    timestamp: "2025-08-04T09:13:00Z",
  },
  {
    id: 14,
    user: "Alice",
    content: "좋은 아침입니다!",
    timestamp: "2025-08-04T09:14:00Z",
  },
  {
    id: 15,
    user: "Bob",
    content: "오늘 회의는 몇 시인가요?",
    timestamp: "2025-08-04T09:15:00Z",
  },
  {
    id: 16,
    user: "Dana",
    content: "점심 메뉴 추천해주세요.",
    timestamp: "2025-08-04T09:16:00Z",
  },
  {
    id: 17,
    user: "Grace",
    content: "새로운 기능 아이디어가 있어요.",
    timestamp: "2025-08-04T09:17:00Z",
  },
  {
    id: 18,
    user: "system",
    content: "연결이 끊어졌습니다. 다시 접속을 시도합니다.",
    timestamp: "2025-08-04T09:18:00Z",
  },
  {
    id: 19,
    user: "Ivan",
    content: "API 응답이 느린 것 같아요.",
    timestamp: "2025-08-04T09:19:00Z",
  },
  {
    id: 20,
    user: "Judy",
    content: "문서 정리 완료했습니다.",
    timestamp: "2025-08-04T09:20:00Z",
  },
];

export const mockDataPlayerList: RoomDetailResponse["participants"] = [
  // 1. 방장
  {
    id: 1,
    name: "test1111",
    isHost: true,
    status: "READY",
  },

  // 2. 참가자 (준비 X)
  {
    id: 2,
    name: "test2222",
    isHost: false,
    status: "READY",
  },

  // 3. 참가자 (준비 O)
  {
    id: 3,
    name: "test3333",
    isHost: false,
    status: "READY",
  },
];

export const mockDataDefaultProblem: Problem = {
  problemId: 1,
  title: "헌법 맞추기",
  content: `이 내용에 대하여 헌법의 제 몇 항을 참조하고 있나요?`,
  answer: `대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 국회는 법률에 저촉되지 아니하는 범위안에서
  의사와 내부규율에 관한 규칙을 제정할 수 있다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와
  초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 그러하지 아니하다.
  모든 국민은 통신의 비밀을 침해받지 아니한다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.
  국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
  법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.`,
  difficulty: "NORMAL",
  genres: ["헌법"],
  createdBy: "system",
  problemType: "EXISTING",
};

export const mockDataCreatedProblem: Problem = {
  problemId: 1,
  title: "헌법 맞추기",
  content: `이 내용에 대하여 헌법의 제 몇 항을 참조하고 있나요?`,
  answer: `대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 국회는 법률에 저촉되지 아니하는 범위안에서
  의사와 내부규율에 관한 규칙을 제정할 수 있다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와
  초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 그러하지 아니하다.
  모든 국민은 통신의 비밀을 침해받지 아니한다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.
  국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
  법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.`,
  difficulty: "NORMAL",
  genres: ["헌법"],
  createdBy: "Craftor",
  problemType: "CUSTOM",
};

export const mockDataQuestionInfo: Interaction = {
  id: 1,
  type: "question",
  username: "Craftor",
  content: "남자는 어떤 직업을 가지고 있었나요?",
  status: AnswerStatus.PENDING,
};

export const testuser1 = {
  userId: 1,
  username: "social1111",
  nickname: "test1111",
  Authorization:
    "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwibmlja25hbWUiOiJ0ZXN0MTExMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU0NTI4Mzc3LCJleHAiOjE3NTQ2MTQ3Nzd9.sc3XOgPAyCUBq_lHR1hs9yN-BWIAPeik9vPm8BM2d90",
};

export const testuser2 = {
  userId: 2,
  username: "social2222",
  nickname: "test2222",
  Authorization:
    "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6Miwibmlja25hbWUiOiJ0ZXN0MjIyMiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU0NTI4MjAwLCJleHAiOjE3NTQ2MTQ2MDB9.68aopWooXDWJVLIsGRjHM8HpTUE9m4JR2FajbOxpnuk",
};

export const testuser3 = {
  userId: 3,
  username: "social3333",
  nickname: "test3333",
  Authorization:
    "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6Mywibmlja25hbWUiOiJ0ZXN0MzMzMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU0Mzk4OTY5LCJleHAiOjE3NTQ0ODUzNjl9.alsYouTQ6KsEPGZXh3S48FOqKvC8Raib-kZw4X41ATk",
};
