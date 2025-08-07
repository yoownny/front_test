import useWebsocketStore from "@/stores/useWebSocketStore";
import { AnswerStatus } from "@/types/game/game";

// 방 입장 요청을 WebSocket을 통해 서버에 발신하는 함수
function publishWS(destination: string, body?: object) {
  const stompClient = useWebsocketStore.getState().client;
  // const token = localStorage.getItem("token");

  // if (!stompClient || !token) {
  //   console.warn("WebSocket client 또는 token이 없습니다.");
  //   return;
  // }

  stompClient?.publish({
    destination,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization:
        // `Bearer ${token}`,
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwibmlja25hbWUiOiJ0ZXN0MTExMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU0Mjk1ODAyLCJleHAiOjE3NTY4ODc4MDJ9.qe5oXJuK9JRLs7DVe7QJ-NJwrvfHqjV85Eo6k-Vzp1E",
    },
  });
}

// 방 생성 발신 WS
export function sendCreateRoom(
  maxPlayers: number,
  timeLimit: number,
  problemInfo: { problemId: string; problemType: "CUSTOM" | "ORIGINAL" | "AI" }
) {
  publishWS("app/room/create", { maxPlayers, timeLimit, problemInfo });
}

// 방 입장 발신 WS
export function sendJoinRoom(roomId: number) {
  publishWS("/app/room/join", { roomId });
}

// 방 퇴장 발신 WS
export function sendLeaveRoom(roomId: number) {
  publishWS("/app/room/leave", { roomId });
}

// 채팅 발신 WS
export function sendChat(roomId: number, content: string) {
  publishWS(`/app/games/${roomId}/chat`, { message: content });
}

// 준비 상태 발신 WS
export function sendReady(roomId: number, isReady: boolean) {
  publishWS(`/app/games/${roomId}`, { message: isReady ? "READY" : "NOT" });
  // 준비 해제 했을 때 명칭은...?
}

// 게임 시작 발신 WS
export function sendGameStart(roomId: number) {
  publishWS(`/app/games/${roomId}/start`);
}

// 질문 발신 WS
export function sendQuestion(roomId: number, content: string) {
  publishWS(`/app/games/${roomId}/question`, { question: content });
}

// 답변 발신 WS
export function sendReply(
  roomId: number,
  questionerId: number,
  question: string,
  answerStatus: AnswerStatus
) {
  publishWS(`/app/games/${roomId}/respond-question`, {
    questionerId,
    question,
    answerStatus,
  });
}

// 정답 추리 발신 WS
export function sendAnswer(roomId: number, content: string) {
  publishWS(`/app/games/${roomId}/guess`, { question: content });
}

// 정답 판정 발신 WS (작업 중)
export function sendJudgement(
  roomId: number,
  senderId: number,
  guess: string,
  answerStatus: AnswerStatus
) {
  publishWS(`/app/games/${roomId}/respond-guess`, {
    senderId,
    guess,
    answerStatus,
  });
}

// 턴 넘기기 발신 WS
export function sendTurnOver(roomId: number) {
  publishWS(`/app/games/${roomId}/pass-turn`);
}
