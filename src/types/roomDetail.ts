import type { SelectedProblem } from "./problem";
import type { User } from "./user";

export interface RoomDetailResponse {
  RoomId: number;
  title: string;
  status: "waiting" | "in_game";
  maxPlayers: number;
  hostId: number;
  problemInfo: SelectedProblem;
  participants: User[];
}