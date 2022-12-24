/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme';
import Players from './Players';
import { PlayerType } from '../../types';
import { TESTING_VOTING_HAND } from '../../config/constants';
import Submissions from './Submissions';

export default function EndOfTurn({
  players,
  handleStartNextTurn,
}: {
  players: PlayerType[]
  handleStartNextTurn: () => void;
}) {

  return (
    <div css={{ textAlign: 'center', padding: spacing.medium, position: 'relative', width: '100%', height: '100vh' }}>
      <Players
        players={players}
        showStatus
        css={{
          margin: `${spacing.large}px auto`,
        }}
      />
      <div css={{ width: '90%', margin: 'auto', marginTop: spacing.xLarge }}>
        <Submissions cards={TESTING_VOTING_HAND} />
      </div>
      <button onClick={handleStartNextTurn}>
        Start next turn
      </button>
    </div>
  )
}
