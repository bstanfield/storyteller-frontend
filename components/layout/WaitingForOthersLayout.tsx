/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme';
import { ReactNode } from 'react';
import Players from '../game/Players';
import { CardType, Player } from '../../types';
import FannedHand from '../game/FannedHand';

export default function WaitingOnOthersLayout({
  topMatter,
  players,
  cards,
  round,
}: {
  children?: ReactNode,
  topMatter?: ReactNode,
  players: Player[]
  cards: CardType[]
  round: any,
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
      {round?.submissions && <h3 css={{ opacity: 0.5 }}>Waiting on {round.submissions.playersThatHaveNotSubmitted.length} players...</h3>}
      <div css={{
        // position: 'fixed', bottom: 100
        marginTop: spacing.large
      }}>
        <FannedHand cards={cards} />
      </div>
    </div>
  )
}
