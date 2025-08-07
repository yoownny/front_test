import useGameStore from "@/stores/gameStore";
import useProblemStore from "@/stores/problemStore";
// import useProblemStore from "@/stores/problemStore";
import useRoomStore from "@/stores/roomStore";
import { type WebsocketResponse } from "@/types/game/game";

// 개인 메시지 수신 WS
// /user/queue/game
export function onPersonal(response: WebsocketResponse) {
  const payload = response.payload;
  const addInteraction = useGameStore.getState().addInteraction;
  // const setRoom = useRoomStore.getState().setRoom;
  // const setProblem = useProblemStore.getState().joinAsPlayer;

  switch (response.eventType) {
    // 방 입장 (개인)
    case "ROOM_JOINED":
      // // 방 정보 설정
      // setRoom({
      //   roomId: payload.roomId,
      //   gameState: payload.state,
      //   maxPlayers: payload.maxPlayers,
      //   numPlayers: payload.currentPlayers,
      //   hostId: payload.hostId,
      //   participants: payload.players.map((player) => ({
      //     id: player.userId,
      //     name: player.nickname,
      //     isHost: player.role === "HOST" ? true : false,
      //     status: "READY",
      //   })),
      // });
      // // 문제 정보 설정 (참가자 기준)
      // setProblem({
      //   problemId: payload.problem.problemId,
      //   title: payload.problem.title,
      //   content: payload.problem.content,
      //   answer: "",
      //   difficulty: payload.problem.difficulty,
      //   genres: payload.problem.genres,
      //   createdBy: payload.problem.creator.nickname,
      //   problemType: payload.problem.source, // 추후 AI 추가 예정
      // });
      break;

    // 방 생성 및 입장 (방장)
    case "ROOM_CREATED":
      console.log(payload);
      break;

    // 질문 수신 (방장)
    case "QUESTION_SEND":
      addInteraction(
        "question",
        payload.questionRequestDto.senderId,
        payload.questionRequestDto.question
      );
      break;

    // 질문에 대한 답변 수신 (참가자)
    // 정답 시도에 대한 것만 온다
    case "RESPOND_QUESTION":
      if (payload.nextGuessDto.senderId)
        addInteraction(
          "answer",
          payload.nextGuessDto.senderId,
          payload.nextGuessDto.question
        );
      break;

    // 추리한 정답 수신 (방장)
    case "GUESS_SEND":
      addInteraction("answer", payload.senderId, payload.guess);
      break;

    // 턴 넘기기 수신 (넘긴 사람, 받은 사람)
    case "NEXT_TURN":
      break;

    // 오류 발생
    case "ERROR":
      console.log(payload);
      break;
  }
}

// Lobby에서 WS 수신
// /topic/lobby
export function onLobby(response: WebsocketResponse) {
  const payload = response.payload;
  switch (response.eventType) {
    case "ROOM_UPDATED":
      break;
  }
}

// 방 내부 정보 WS 수신
// /topic/games/${roomId}
export function onRoom(response: WebsocketResponse) {
  const payload = response.payload;

  switch (response.eventType) {
    case "PLAYER_JOINED":
      useRoomStore.getState().joinPlayer(
        {
          id: payload.userId,
          name: payload.nickname,
          isHost: payload.role === "HOST" ? true : false,
          status: payload.state,
        },
        payload.currentPlayers
      );
      break;

    case "CORRECT_ANSWER":
      break;
  }
}

// Chatting에서 WS 수신
// /topic/games/${roomId}/chat
export function onChat(response: WebsocketResponse) {
  const payload = response.payload;
  const playerList = useGameStore.getState().players;
  const addChatting = useRoomStore.getState().addChatting;

  const displayIcon = (answer: string) => {
    switch (answer) {
      case "CORRECT":
        return "⭕";
      case "INCORRECT":
        return "❌";
      case "IRRELEVANT":
        return "🟡";
      default:
        return "❓";
    }
  };

  switch (response.eventType) {
    // 상호 대화 정보 수신
    case "CHAT":
      addChatting(payload.nickname, payload.message, payload.timestamp);
      break;

    // 질문에 대한 답변 수신
    case "QUESTION":
      addChatting(
        playerList.find((player) => player.id === payload.qnA.questionerId)
          ?.name ?? "Unknown",
        `${payload.qnA.question} - ${displayIcon(payload.qnA.answer)}`,
        Date()
      );
      break;

    // 정답에 대한 결과 수신
    case "RESPOND_GUESS":
      addChatting(
        playerList.find((player) => player.id === payload.questionerId)?.name ??
          "Unknown",
        `${payload.question} - ${displayIcon(payload.answer)}`,
        Date()
      );
      break;
  }
}

// History에서 WS 수신
// /topic/games/${roomId}/history
export function onHistory(response: WebsocketResponse) {
  const payload = response.payload;
  const addHistory = useGameStore.getState().addHistory;

  addHistory(
    payload.historyType.toLowerCase(),
    payload.questionerId,
    payload.question,
    payload.answer
  );
  
  // switch (response.eventType) {
  //   case "QUESTION":
  //     addHistory(
  //       payload.historyType.toLowerCase(),
  //       payload.questionerId,
  //       payload.question,
  //       payload.answer
  //     );
  //     break;

  //   case "GUESS":
  //     addHistory(
  //       payload.historyType.toLowerCase(),
  //       payload.questionerId,
  //       payload.question,
  //       payload.answer
  //     );
  //     break;
  // }
}

// Game Start WS 수신
// /topic/games/${roomId}/start
export function onGameStart(response: WebsocketResponse) {
  const gameStart = useGameStore.getState().gameStart;
  const payload = response.payload;
  switch (response.eventType) {
    case "GAME_STARTED":
      console.log(payload);
      gameStart(
        payload.roomId,
        payload.players.map((player) => ({
          id: player.userId,
          name: player.nickname,
          isHost: player.role === "HOST" ? true : false,
          status: player.state,
          answerAttempts: player.answerAttempts,
        })),
        payload.gameStatus.remainingQuestions,
        payload.gameStatus.totalQuestions
      );
      break;
  }
}
