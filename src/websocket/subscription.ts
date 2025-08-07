import useWebsocketStore from "@/stores/useWebSocketStore";
import { onChat, onLobby, onPersonal, onHistory, onGameStart, onRoom } from "./handler";

// Subscription 관리 함수
const LOBBY_TOPIC = "/topic/lobby";
const MY_TOPIC = "/user/queue/game";

// 로비 입장 WS
export function joinLobby() {
  const stompClient = useWebsocketStore.getState().client;
  const { addSubscription } = useWebsocketStore.getState();
  if (!stompClient) return;

  const subscription = stompClient.subscribe(LOBBY_TOPIC, (message) => {
    const response = JSON.parse(message.body);
    onLobby(response);
  });

  addSubscription(LOBBY_TOPIC, subscription);
}

// 로비 퇴장 WS
export function leaveLobby() {
  const { getSubscription, removeSubscription } = useWebsocketStore.getState();
  const subscription = getSubscription(LOBBY_TOPIC);

  if (subscription) {
    subscription.unsubscribe();
    removeSubscription(LOBBY_TOPIC);
  }

  console.log("로비 퇴장 완료");
}

// 개인 메시지 채널 구독 추가 WS (로그인의 경우)
export function joinMyMsg() {
  const stompClient = useWebsocketStore.getState().client;
  const { addSubscription } = useWebsocketStore.getState();
  if (!stompClient) return;

  const subscription = stompClient.subscribe(MY_TOPIC, (message) => {
    const response = JSON.parse(message.body);
    onPersonal(response);
  });

  addSubscription(MY_TOPIC, subscription);
}

// 개인 메시지 채널 구독 삭제 WS (로그아웃의 경우)
export function leaveMyMsg() {
  const { getSubscription, removeSubscription } = useWebsocketStore.getState();
  const subscription = getSubscription(MY_TOPIC);

  if (subscription) {
    subscription.unsubscribe();
    removeSubscription(MY_TOPIC);
  }

  console.log("로비 퇴장 완료");
}

// 방 입장 WS
export function joinRoom(roomId: number) {
  const stompClient = useWebsocketStore.getState().client;
  const { addSubscription } = useWebsocketStore.getState();

  if (!stompClient) return;

  const subsData = [
    { topic: `/topic/games/${roomId}`, handler: onRoom },
    { topic: `/topic/games/${roomId}/chat`, handler: onChat },
    { topic: `/topic/games/${roomId}/history`, handler: onHistory },
    { topic: `/topic/games/${roomId}/start`, handler: onGameStart },
  ];

  subsData.forEach(({ topic, handler }) => {
    const subscription = stompClient.subscribe(topic, (msg) => {
      const data = JSON.parse(msg.body);
      handler(data);
    });
    addSubscription(topic, subscription);
  });

  console.log(`방 ${roomId} 입장 및 구독 완료`);
}

// 방 퇴장 WS
export function leaveRoom(roomId: number) {
  const { getAllSubscriptions, removeSubscription } =
    useWebsocketStore.getState();

  const topicsToLeave = [
    `/topic/games/${roomId}`,
    `/topic/games/${roomId}/chat`,
    `/topic/games/${roomId}/history`,
    `/topic/games/${roomId}/start`,
  ];

  topicsToLeave.forEach((topic) => {
    const subscription = getAllSubscriptions()[topic];
    if (subscription) {
      subscription.unsubscribe();
      removeSubscription(topic);
    }
  });

  console.log(`방 ${roomId} 퇴장 및 구독 해제 완료`);
}
