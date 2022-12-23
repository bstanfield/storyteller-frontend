export type PlayerState = 'choosing' | 'guessing' | 'done';

export interface Player {
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
  owner: Player,
  voters: Player[],
  isStoryteller: boolean,
}