/** @jsxImportSource @emotion/react */

import { TESTING_SAMPLE_HAND } from '../../config/constants';
import FannedHand from './FannedHand';
import EnterClue from './lightbox/EnterClue';
import { spacing } from '../../styles/theme';
import { useState } from 'react';
import ChooseCardLayout from '../layout/ChooseCardLayout';
import { CardType, PlayerType } from '../../types';

export default function ChooseCard(
  { handleSubmitClue, players, cards }
    : {
      handleSubmitClue: (clue: string, imgixPath: string) => void,
      players: PlayerType[],
      cards: CardType[],
    }
) {
  const [imageToShow, setImageToShow] = useState('');

  function handleCardClick(slug) {
    setImageToShow(slug);
  }

  function handleSubmit(clue, imgixPath) {
    setImageToShow('')
    handleSubmitClue(clue, imgixPath);
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
          handleSubmit={clue => handleSubmit(clue, imageToShow)}
          slug={imageToShow}
        />
      }
      <div css={{ marginTop: spacing.xLarge }}>
        <FannedHand cards={cards} handleCardClick={handleCardClick} />
      </div>
    </ChooseCardLayout>
  )
}
