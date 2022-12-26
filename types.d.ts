export type PlayerState = 'playing' | 'waiting';

export interface PlayerType {
  playerId?: string, // uuid 
  name?: string,
  username?: string,
  avatarUrl?: string,
  imgixPath?: string,
  score?: number,
  isStoryteller?: boolean,
  state?: PlayerState,
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