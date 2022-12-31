/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme'
import Players from './Players'
import { PlayerType } from '../../types'
import { TESTING_VOTING_HAND } from '../../config/constants'
import Submissions from './Submissions'

export default function EndOfTurn({
  players,
  handleStartNextTurn,
  votes,
  submissions,
  storyteller,
  localUser,
  clue
}: {
  players: PlayerType[]
  handleStartNextTurn: () => void
}) {
  return (
    <div
      css={{
        textAlign: 'center',
        padding: spacing.medium,
        position: 'relative',
        width: '100%',
        height: '100vh'
      }}
    >
      <Players
        players={players}
        showStatus={false}
        css={{
          margin: `${spacing.large}px auto`
        }}
        localUser={localUser}
      />
      <h1>
        {storyteller}’s “{clue}”
      </h1>
      <div css={{ width: '90%', margin: 'auto', marginTop: spacing.xLarge }}>
        <Submissions
          players={players}
          votes={votes}
          storyteller={storyteller}
          cards={submissions}
        />
      </div>
      <button
        onClick={handleStartNextTurn}
        css={{ marginTop: spacing.xxLarge, marginBottom: spacing.medium }}
      >
        Start next turn
      </button>
    </div>
  )
}
