/** @jsxImportSource @emotion/react */

import { TESTING_SAMPLE_HAND } from '../../config/constants';
import FannedHand from './FannedHand';
import { spacing } from '../../styles/theme';
import { useState } from 'react';
import ChooseCardLayout from '../layout/ChooseCardLayout';
import ConfirmSelection from './lightbox/ConfirmSelection';
import Clue from './Clue';
import { Player } from '../../types';

export default function GuesserChooseCard({
  clue,
  players,
  handleContenderSubmission,
  cards
}: {
  clue?: string,
  players: Player[],
  handleContenderSubmission: (slug: string) => void;
  cards: CardType[]
}) {
  const [imageToShow, setImageToShow] = useState('');

  function handleCardClick(slug) {
    setImageToShow(slug);
  }

  return (
    <ChooseCardLayout
      headerText={players.length === 3 ? 'Pick two cards:' : 'Pick one card:'}
      players={players}
      topMatter={clue && (
        <Clue storyteller={players[0].username} clue={clue} />
      )}
    >
      {imageToShow &&
        <ConfirmSelection
          handleClose={() => setImageToShow('')}
          handleSubmit={() => handleContenderSubmission(imageToShow)}
          slug={imageToShow}
        />
      }
      <div css={{ marginTop: spacing.xLarge }}>
        <FannedHand cards={cards} handleCardClick={handleCardClick} />
      </div>
    </ChooseCardLayout>
  )
}
