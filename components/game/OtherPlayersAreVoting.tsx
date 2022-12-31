/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme'
import Players from './Players'
import { PlayerType } from '../../types'
import { TESTING_VOTING_HAND } from '../../config/constants'
import Submissions from './Submissions'

export default function OtherPlayersAreVoting({
  players,
  submissions,
  localUser
}: {
  players: PlayerType[]
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
      <h1>Other players are voting...</h1>
      <Players
        players={players}
        showStatus
        localUser={localUser}
        css={{
          margin: `${spacing.large}px auto`
        }}
      />
      <div
        css={{
          width: 'fit-content',
          margin: 'auto',
          marginTop: spacing.xLarge
        }}
      >
        <Submissions cards={submissions} />
      </div>
    </div>
  )
}
