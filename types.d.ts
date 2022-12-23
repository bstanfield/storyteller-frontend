export type PlayerState = 'choosing' | 'guessing' | 'done';

export interface Player {
  playerId?: string, // uuid 
  username: string,
  avatarUrl: string,
  score?: number,
  isStoryteller?: boolean,
  state?: PlayerState,
}