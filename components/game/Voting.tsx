/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme';
import Players from './Players';
import { PlayerType } from '../../types';
import { TESTING_VOTING_HAND } from '../../config/constants';
import Clue from './Clue';
import Submissions from './Submissions';
import { useState } from 'react';
import ConfirmSelection from './lightbox/ConfirmSelection';

export default function Voting({
  players,
  storyteller,
  clue,
  handleSubmitVote,
  submissions,
  vote,
  localUser
}: {
  clue: string,
  players: PlayerType[]
  storyteller: string,
  submissions: string[],
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
          <h1>Pick the original "{clue}"</h1>
          <h3 css={{ opacity: 0.5 }}>Choose one.</h3>
        </>
      )}
      <div css={{ width: '90%', margin: 'auto', marginTop: spacing.xLarge }}>
        <Submissions cards={submissions} handleCardClick={handleCardClick} />
      </div>
      <Players
        players={players}
        showStatus
        css={{
          margin: `${spacing.large}px auto`,
        }}
        localUser={localUser}
      />
    </div>
  )
}
