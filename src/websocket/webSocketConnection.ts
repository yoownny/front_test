import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useWebsocket from "@/stores/useWebSocketStore";
import { joinMyMsg, joinRoom } from "./subscription";

// 시스템 메시지를 출력하는 유틸 함수
function addSystemMessage(message: string, type: "system" | "user" = "system") {
  console.log(`[${type.toUpperCase()}] ${message}`);
}

export function openConnect(): void {
  // 라이브러리 로딩 확인
  if (typeof SockJS === "undefined") {
    addSystemMessage("SockJS 라이브러리가 로드되지 않았습니다.", "system");
    return;
  }

  // Client가 제대로 import되었는지 체크
  if (typeof Client === "undefined") {
    addSystemMessage("Client 라이브러리가 로드되지 않았습니다.", "system");
    return;
  }

  const { setClient } = useWebsocket.getState();

  try {
    addSystemMessage(`연결 시도 중...`, "system");

    const socket = new SockJS(import.meta.env.VITE_WS_BASE_URL);

    const storageString = localStorage.getItem("auth-storage");
    if (!storageString) {
      addSystemMessage(
        "🔒 인증 정보가 없습니다. WebSocket 연결을 중단합니다.",
        "system"
      );
      return;
    }

    let storageItems;
    try {
      storageItems = JSON.parse(storageString);
    } catch {
      addSystemMessage("🔒 인증 정보 파싱 실패. 연결 중단", "system");
      return;
    }

    // accessToken 존재 여부 확인
    const accessToken = storageItems.state.accessToken;
    const socialId = storageItems.state.user.socialId;
    const nickname = storageItems.state.user.nickname;

    // Client 정의
    const stompClient = new Client({
      webSocketFactory: () => {
        return socket;
      },
      // ✅ userId를 헤더에 담아 서버로 전달
      connectHeaders: {
        socialId: socialId,
        nickname: nickname,
        Authorization: `Bearer ${accessToken}`,
      },

      // // 디버그 Logging 설정
      // debug: (str: string) => {
      //   console.log("STOMP DEBUG:", str);
      // },

      // 연결 성공
      onConnect: () => {
        addSystemMessage(`Websocket 연결 성공`, "system");
        setClient(stompClient);
        joinMyMsg();

        const { currentRoomId } = useWebsocket.getState();
        if (currentRoomId !== null) {
          joinRoom(currentRoomId); // 🔁 새로고침 후 재접속 시 구독 복원
        }
      },

      // Stomp 에러
      onStompError: (frame) => {
        addSystemMessage(`STOMP 에러: ${frame.headers["message"]}`, "system");
      },

      // webSocket 에러
      onWebSocketError: (event) => {
        addSystemMessage(`WebSocket 연결 오류: ${event}`, "system");
      },

      // 연결 끊어짐
      onDisconnect: () => {
        addSystemMessage("연결이 끊어졌습니다.", "system");
        setClient(null);
      },
      // STOMP Protocol 표준: 연결 해제 시 귀속된 모든 구독은
      // Client/Server 양쪽에서 제거됩니다.

      // 하트비트 설정
      reconnectDelay: 2000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
    });

    // 연결 시작
    stompClient.activate();
  } catch (error) {
    if (error instanceof Error) {
      addSystemMessage("연결 중 에러: " + error.message, "system");
    } else {
      addSystemMessage("알 수 없는 에러 발생", "system");
    }
  }
}

export function closeConnect(): void {
  const client = useWebsocket.getState().client;
  client?.deactivate();
}
