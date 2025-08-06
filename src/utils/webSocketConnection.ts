import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useWebsocket from "@/stores/useWebSocketStore";

// 시스템 메시지를 출력하는 유틸 함수
function addMessage(message: string, type: "system" | "user" = "system") {
  console.log(`[${type.toUpperCase()}] ${message}`);
}

export function openConnect(roomId: string | undefined): void {
  // 라이브러리 로딩 확인
  if (typeof SockJS === "undefined") {
    addMessage("SockJS 라이브러리가 로드되지 않았습니다.", "system");
    return;
  }

  // Client가 제대로 import되었는지 체크
  if (typeof Client === "undefined") {
    addMessage("Client 라이브러리가 로드되지 않았습니다.", "system");
    return;
  }

  const { setClient, setConnected } = useWebsocket.getState();

  try {
    addMessage(`연결 시도 중...`, "system");

    // SockJS endpoint로 등록한 주소를 포함하여 기입
    const socket = new SockJS("http://70.12.247.130:8080/ws");

    // Client 정의
    const stompClient = new Client({
      webSocketFactory: () => {
        return socket;
      },
      // ✅ userId를 헤더에 담아 서버로 전달
      connectHeaders: {
        userId: "1",
      },

      // // 디버그 Logging 설정
      // debug: (str: string) => {
      //   console.log("STOMP DEBUG:", str);
      // },

      // 연결 성공
      onConnect: () => {
        setConnected(true);
        addMessage(`방 ${roomId}에 연결 성공`, "system");

        stompClient.subscribe("/room/" + roomId, (message) => {
          console.log(message);
        });
      },

      // Stomp 에러
      onStompError: (frame) => {
        setConnected(false);
        addMessage(`STOMP 에러: ${frame.headers["message"]}`, "system");
      },

      // webSocket 에러
      onWebSocketError: (event) => {
        setConnected(false);
        addMessage(`WebSocket 연결 오류: ${event}`, "system");
      },

      // 연결 끊어짐
      onDisconnect: () => {
        setConnected(false);
        addMessage("연결이 끊어졌습니다.", "system");
        setClient(null);
      },

      // 하트비트 설정
      reconnectDelay: 2000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
    });

    // 연결 시작
    stompClient.activate();
    setClient(stompClient);
  } catch (error) {
    addMessage("연결 중 에러: " + error.message, "system");
    setConnected(false);
  }
}

export function closeConnect(): void {
  const client = useWebsocket.getState().client;
  client?.deactivate();
}
