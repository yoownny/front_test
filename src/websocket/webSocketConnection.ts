import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useWebsocket from "@/stores/useWebSocketStore";
import { joinMyMsg, joinRoom } from "./subscription";
import { testuser1, testuser2, testuser3 } from "@/mockdata";

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

    // SockJS endpoint로 등록한 주소를 포함하여 기입
    // const socket = new SockJS("http://70.12.247.130:8080/ws");
    const socket = new SockJS("https://i13a607.p.ssafy.io/ws");

    // Client 정의
    const stompClient = new Client({
      webSocketFactory: () => {
        return socket;
      },
      // ✅ userId를 헤더에 담아 서버로 전달
      connectHeaders: {
        socialId: testuser2.username,
        nickname: testuser2.nickname,
        Authorization: `Bearer ${testuser2.Authorization}`,
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
