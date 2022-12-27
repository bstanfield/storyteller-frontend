export type PlayerState = 'playing' | 'waiting' | 'hidden';

export interface PlayerType {
  playerId?: string, // uuid 
  name?: string,
  username?: string,
  avatarUrl?: string,
  imgixPath?: string,
  score?: number,
  isStoryteller?: boolean,
  status?: PlayerState,
}

export interface CardType {
  imgix_path: string,
  id: number,
}

export interface SubmittedCard {
  imgixPath: string,
  owner: PlayerType,
  voters: PlayerType[],
  isStoryteller: boolean,
}