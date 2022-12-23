/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme';
import Players from './Players';
import { Player } from '../../types';
import { TESTING_SAMPLE_HAND, TESTING_VOTING_HAND } from '../../config/constants';
import Clue from './Clue';
import Submissions from './Submissions';
import { useState } from 'react';
import ConfirmSelection from './lightbox/ConfirmSelection';

export default function Voting({
  players,
  storyteller,
  clue,
  handleSubmitVote,
  vote,
}: {
  clue: string,
  players: Player[]
  storyteller: string,
  handleSubmitVote: (slug: string) => void;
}) {
  const [imageToShow, setImageToShow] = useState('');

  function handleCardClick(slug) {
    setImageToShow(slug);
  }

  function handleSubmit() {
    setImageToShow('');
    handleSubmitVote(imageToShow);
  }

  return (
    <div css={{ textAlign: 'center', padding: spacing.medium, position: 'relative', width: '100%', height: '100vh' }}>

      {imageToShow &&
        <ConfirmSelection
          handleClose={() => setImageToShow('')}
          handleSubmit={handleSubmit}
          slug={imageToShow}
        />
      }
      <Clue storyteller={storyteller} clue={clue} />
      {vote ? (
        <h1>Your vote is in!</h1>
      ) : (
        <>
          <h1>Which card is {storyteller}’s?</h1>
          <h3 css={{ opacity: 0.5 }}>Choose one.</h3>
        </>
      )}
      <div css={{ width: '90%', margin: 'auto', marginTop: spacing.xLarge }}>
        <Submissions cards={TESTING_VOTING_HAND} handleCardClick={handleCardClick} />
      </div>
      <Players
        players={players}
        showStatus
        css={{
          margin: `${spacing.large}px auto`,
        }}
      />
    </div>
  )
}
