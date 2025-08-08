import useGameStore from "@/stores/gameStore";
import useProblemStore from "@/stores/problemStore";
import useRoomStore from "@/stores/roomStore";
import useUserStore from "@/stores/userStore";
import { type WebsocketResponse } from "@/types/game/game";

// 개인 메시지 WS 수신
// /user/queue/game
export function onPersonalGame(response: WebsocketResponse) {
  console.log("Personal Msg: ", response.eventType);

  const payload = response.payload;
  const myUserId = useUserStore.getState().userId;
  const addInteraction = useGameStore.getState().addInteraction;
  const setRoom = useRoomStore.getState().setRoom;
  const joinAsPlayer = useProblemStore.getState().joinAsPlayer;
  const turnOver = useGameStore.getState().turnOver;

  switch (response.eventType) {
    // 방 입장 (개인)
    case "ROOM_JOINED": {
      const problem = payload.problem;

      // // 방 정보 설정
      setRoom({
        ...payload,
        participants: payload.players.map((player) => ({
          id: player.userId,
          name: player.nickname,
          isHost: player.role === "HOST",
          status: "READY",
        })),
        numPlayers: payload.currentPlayers,
      });
      // 문제 정보 설정 (참가자 기준)
      joinAsPlayer({
        ...problem,
        answer: "",
        createdBy: problem.creator.nickname,
        problemType: problem.source, // 추후 AI 추가 예정
      });
      console.log(useRoomStore.getState().roomId);
      console.log(useRoomStore.getState().players);
      console.log(useProblemStore.getState().title);
      console.log(useProblemStore.getState().answer);
      break;
    }

    // 준비 상태 내용 (참가자)
    case "READY_STATUS_CHANGED":
      // if (payload.success && payload.userId === myUserId) {
      //   useRoomStore.getState().toggleReady(myUserId);
      // }
      break;

    // 질문 수신 (방장)
    case "QUESTION_SEND":
      addInteraction(
        "QUESTION",
        payload.questionRequestDto.senderId,
        payload.questionRequestDto.question
      );
      break;

    // 추리한 정답 수신 (방장)
    case "GUESS_SEND":
      addInteraction("GUESS", payload.senderId, payload.guess);
      break;

    // 질문 이후 가장 오래된 정답 시도 수신 (방장)
    case "RESPOND_QUESTION": {
      const next = payload.nextGuessDto;
      if (next && next.senderId && next.guess) {
        addInteraction("GUESS", next.senderId, next.guess);
      }
      break;
    }

    // 정답 이후 다음 정답 시도 수신 (방장)
    case "RESPOND_GUESS": {
      // 전체에게 결과 채팅 후, 개인에 전달되는 다음 시도 or turn
      const next = payload;
      if (next.senderId && next.guess) {
        addInteraction("GUESS", next.senderId, next.guess);
      } else if (payload.eventType === "NEXT_TURN") {
        turnOver(payload.nextPlayerId);
      }
      break;
    }

    // 턴 넘기기 수신 (넘긴 사람, 받은 사람)
    case "NEXT_TURN":
      turnOver(payload.nextPlayerId);
      break;

    // 오류 발생
    case "ERROR":
      console.error(payload);
      break;
  }
}

// 방 설정 WS 수신
// /user/queue/room
export function onRoomSetting(response: WebsocketResponse) {
  console.log("Room status Changed: ", response.eventType)
  const payload = response.payload;
  const setRoom = useRoomStore.getState().setRoom;
  const joinAsHost = useProblemStore.getState().joinAsHost;

  console.log(payload);
  switch (response.eventType) {
    // 방 생성 및 입장 (방장)
    case "ROOM_CREATED": {
      const problem = payload.problem;

      setRoom({
        ...payload,
        participants: payload.players.map((player) => ({
          id: player.userId,
          name: player.nickname,
          isHost: player.role === "HOST" ? true : false,
          status: "READY",
        })),
        numPlayers: payload.currentPlayers,
      });
      // 문제 정보 설정 (참가자 기준)
      joinAsHost({
        ...problem,
        createdBy: problem.creator.nickname,
        problemType: problem.source, // 추후 AI 추가 예정
      });
      console.log(useRoomStore.getState().roomId);
      break;
    }
  }
}

// Lobby에서 WS 수신
// /topic/lobby
export function onLobby(response: WebsocketResponse) {
  console.log("Lobby Msg: ", response.eventType);

  const payload = response.payload;
  switch (response.eventType) {
    case "ROOM_UPDATED":
      break;
  }
}

// 방 내부 정보 WS 수신
// /topic/games/${roomId}
export function onRoom(response: WebsocketResponse) {
  console.log("Room Msg: ", response.eventType);

  const payload = response.payload;
  const { gameStart, gameOver } = useGameStore.getState();
  const updateStatus = useRoomStore.getState().updateStatus;
  const joinPlayer = useRoomStore.getState().joinPlayer;

  switch (response.eventType) {
    // 참가자 입장
    case "PLAYER_JOINED":
      joinPlayer(
        {
          id: payload.userId,
          name: payload.nickname,
          isHost: payload.role === "HOST",
          status: payload.state,
        },
        payload.currentPlayers
      );
      break;

    // 준비 상태 업데이트
    case "ROOM_READY_STATUS_UPDATED":
      updateStatus(
        payload.participants.map((player) => ({
          id: player.userId,
          name: player.nickname,
          isHost: player.role === "HOST",
          status: "PLAYING",
        }))
      );

      break;

    // 게임 시작
    case "GAME_STARTED": {
      const gameData = payload.gameInfoResponseDto;
      gameStart(
        gameData.roomId,
        gameData.players.map((player) => ({
          id: player.userId,
          name: player.nickname,
          isHost: player.role === "HOST",
          status: "PLAYING",
          answerAttempts: player.answerAttempts,
        })),
        gameData.gameStatus.remainingQuestions,
        gameData.gameStatus.totalQuestions,
        {
          id: gameData.currentTurn.questionerId,
          name: gameData.currentTurn.nickname,
          isHost: false,
          status: "PLAYING",
        }
      );
      break;
    }
    // 정답을 맞춘 경우
    case "CORRECT_ANSWER":
      gameOver(
        payload.winnerInfo.winnerId,
        payload.winnerInfo.nickname,
        payload.problem.guess,
        payload.totalQuestionCount,
        payload.playTime
      );
      break;

    // 게임 종료
    case "END_GAME":
      console.log("Game ended:", payload);

      break;
  }
}

// Chatting에서 WS 수신
// /topic/games/${roomId}/chat
export function onChat(response: WebsocketResponse) {
  console.log("Chatting Msg: ", response.eventType);

  const payload = response.payload;
  const playerList = useGameStore.getState().players;
  const addChatting = useRoomStore.getState().addChatting;

  const getPlayerName = (id: number): string =>
    playerList.find((player) => player.id === id)?.name ?? "Unknown";

  const displayResult = (answer: string) => {
    switch (answer) {
      case "CORRECT":
        return "맞습니다. ⭕";
      case "INCORRECT":
        return "아닙니다. ❌";
      case "IRRELEVANT":
        return "상관없습니다. 🟡";
      default:
        return "❓";
    }
  };

  console.log(payload);
  switch (response.eventType) {
    // 상호 대화 정보 수신
    case "CHAT":
      addChatting(payload.nickname, payload.message, payload.timestamp);
      break;

    // 질문 수신
    case "QUESTION":
      addChatting(
        getPlayerName(payload.questionRequestDto.senderId),
        payload.questionRequestDto.question,
        new Date().toISOString()
      );
      break;

    // 질문에 대한 답변 수신
    case "RESPOND_QUESTION": {
      const { qnA = {} } = payload;
      const question = qnA.question ?? "(질문 없음)";
      const answerText = displayResult(qnA.answer ?? "UNKNOWN");
      // 질문과 답변만 출력
      addChatting(
        getPlayerName(qnA.questionerId ?? -1),
        `${question} → [답변: ${answerText}]`,
        new Date().toISOString()
      );
      break;
    }

    // 정답 답변 수신
    case "GUESS_SEND":
      addChatting(
        playerList.find((player) => player.id === payload.senderId)?.name ??
          "Unknown",
        payload.guess,
        new Date().toISOString()
      );
      break;

    // 정답에 대한 결과 수신
    case "RESPOND_GUESS":
      addChatting(
        playerList.find((player) => player.id === payload.questionerId)?.name ??
          "Unknown",
        `${payload.question} - ${displayResult(payload.answer)}`,
        new Date().toISOString()
      );
      break;
  }
}

// History에서 WS 수신
// /topic/games/${roomId}/history
export function onHistory(response: WebsocketResponse) {
  const payload = response.payload;
  console.log("History Msg: ", response.eventType);

  const addHistory = useGameStore.getState().addHistory;

  addHistory(
    response.eventType,
    payload.questionerId,
    payload.question,
    payload.answer
  );
}
