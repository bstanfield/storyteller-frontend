/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme';
import { ReactNode } from 'react';
import Players from '../game/Players';
import { Player } from '../../types';
import Hand from '../game/Hand';
import { TESTING_SAMPLE_HAND } from '../../config/constants';

export default function WaitingOnOthersLayout({
  topMatter,
  players,
}: {
  children?: ReactNode,
  preheaderText?: string,
  headerText: string,
  topMatter?: ReactNode,
  players: Player[]
}) {

  return (
    <div css={{ textAlign: 'center', padding: spacing.medium, position: 'relative', width: '100%', height: '100vh' }}>
      {topMatter}
      <Players
        players={players}
        showStatus
        css={{
          margin: `${spacing.large}px auto`,
        }}
      />
      <h3>Waiting on X players...</h3>
      <div css={{ position: 'fixed', bottom: 0 }}>
        <Hand cards={TESTING_SAMPLE_HAND} />
      </div>
    </div>
  )
}
