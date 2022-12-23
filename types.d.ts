export type PlayerState = 'guessing' | 'done' | 'voting';

export interface Player {
  playerId?: string, // uuid 
  username: string,
  avatarUrl: string,
  score?: number,
  isStoryteller?: boolean,
  state?: PlayerState,
}