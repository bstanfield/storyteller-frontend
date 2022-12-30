/** @jsxImportSource @emotion/react */

import FannedHand from './FannedHand';
import { spacing } from '../../styles/theme';
import { useState } from 'react';
import ChooseCardLayout from '../layout/ChooseCardLayout';
import ConfirmSelection from './lightbox/ConfirmSelection';
import Clue from './Clue';
import { PlayerType } from '../../types';

export default function GuesserChooseCard({
  players,
  handleContenderSubmission,
  cards,
  roundData,
  cardModePreference,
  localUser
}: {
  players: PlayerType[],
  handleContenderSubmission: (slug: string) => void;
  cards: CardType[],
  roundData
}) {
  const [imageToShow, setImageToShow] = useState('');

  // Perhaps this needs to get moved to top-level?
  function handleCardClick(slug) {
    setImageToShow(slug);
  }

  function handleConfirmSelection() {
    handleContenderSubmission(imageToShow);
    setImageToShow('');
  }

  return (
    <ChooseCardLayout
      localUser={localUser}
      headerText={players.length === 3 ? 'Pick two cards:' : 'Pick one card:'}
      players={players}
      topMatter={roundData.clue && (
        <Clue
          storyteller={roundData.storyteller.name}
          clue={roundData.clue}
        />
      )}
    >
      {imageToShow &&
        <ConfirmSelection
          handleClose={() => setImageToShow('')}
          handleSubmit={handleConfirmSelection}
          slug={imageToShow}
        />
      }
      <div css={{ marginTop: spacing.xLarge }}>
        <FannedHand cards={cards} handleCardClick={handleCardClick} cardModePreference={cardModePreference} />
      </div>
    </ChooseCardLayout>
  )
}
