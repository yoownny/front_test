export interface ChatLog {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  eventType: string;
  payload: {
    senderId: number;
    nickname: string;
    message: string;
    timestamp: string;
  };
}
