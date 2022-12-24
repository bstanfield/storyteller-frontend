export type PlayerState = 'choosing' | 'guessing' | 'done';

export interface PlayerType {
  playerId?: string, // uuid 
  name?: string,
  username?: string,
  avatarUrl?: string,
  imgix_path?: string,
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