/** @jsxImportSource @emotion/react */

import { TESTING_SAMPLE_HAND } from '../../config/constants';
import Hand from './Hand';
import EnterClue from './lightbox/EnterClue';
import { spacing } from '../../styles/theme';
import { useState } from 'react';
import ChooseCardLayout from '../layout/ChooseCardLayout';
import { Player } from '../../types';

export default function ChooseCard(
  { handleSubmitClue, players }
    : { handleSubmitClue: (clue: string) => void, players: Player[] }
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
        <Hand cards={TESTING_SAMPLE_HAND} handleCardClick={handleCardClick} />
      </div>
    </ChooseCardLayout>
  )
}
