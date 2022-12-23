/** @jsxImportSource @emotion/react */

import { TESTING_SAMPLE_HAND } from '../../config/constants';
import FannedHand from './FannedHand';
import EnterClue from './lightbox/EnterClue';
import { spacing } from '../../styles/theme';
import { useState } from 'react';
import ChooseCardLayout from '../layout/ChooseCardLayout';
import { CardType, Player } from '../../types';

export default function ChooseCard(
  { handleSubmitClue, players, cards }
    : { handleSubmitClue: (clue: string) => void, players: Player[], cards: CardType[] }
) {
  const [imageToShow, setImageToShow] = useState('');

  function handleCardClick(slug) {
    setImageToShow(slug);
  }

  function handleSubmit(clue) {
    setImageToShow('')
    handleSubmitClue(clue);
  }

  return (
    <ChooseCardLayout
      preheaderText='You’re the storyteller!'
      headerText='Choose a card:'
      players={players}
    >
      {imageToShow &&
        <EnterClue
          handleClose={() => setImageToShow('')}
          handleSubmit={clue => handleSubmit(clue)}
          slug={imageToShow}
        />
      }
      <div css={{ marginTop: spacing.xLarge }}>
        <FannedHand cards={cards} handleCardClick={handleCardClick} />
      </div>
    </ChooseCardLayout>
  )
}
