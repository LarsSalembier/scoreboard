export interface Player {
  id: string;
  data: PlayerData;
}

export interface PlayerData {
  name: string;
  avatar: string | null;
  score: number;
}

export interface PlayerDataOptional {
  name?: string;
  avatar?: string | null;
  score?: number;
}
