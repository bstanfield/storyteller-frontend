export const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://storyteller-game-server.herokuapp.com'
    : 'http://127.0.0.1:4001'

export function getPhaseFromRoundData(
  playerId,
  { clue, completedAt, submissions }
) {
  if (completedAt) {
    return 'score'
  }

  if (submissions.playersThatHaveNotSubmitted?.length === 0) {
    return 'voting'
  }

  if (clue) {
    return 'choosing'
  } else return 'clue'
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// export const ENDPOINT = 'http://192.168.1.168:4001';

// export const ENDPOINT = "https://multiplayer-crossword-server.herokuapp.com";
// export const ENDPOINT = "https://wordvault-pr-9.herokuapp.com";
