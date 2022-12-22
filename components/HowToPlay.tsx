/** @jsxImportSource @emotion/react */

import { spacing } from "../styles/theme";
import Lightbox from "./layout/Lightbox";

export default function HowToPlay({ handleClose }: { handleClose: () => void }) {
  return (
    <Lightbox handleClose={handleClose}>
      <div css={{ maxWidth: 600, margin: 'auto' }}>
        <h1 css={{ textAlign: 'center', margin: spacing.xLarge }}>How to play</h1>
        <h2>1. Create the riddle</h2>
        <p>The storyteller looks at the 6 cards in their hand. They select one that inspires them (without revealing it), and then enter a clue to describe the card.</p>
        <p>Each other player then selects, from 6 cards in their hand, a card that they feel best illustrates the clue given by the storyteller. All the cards, including the storyteller’s original card, are shuffled together and displayed.</p>

        <h2>2. Solve the riddle</h2>
        <p>Everyone’s goal (except the storyteller) is to find the storyteller’s card. Each player (except the storyteller) secretly picks one card that they think is the storyteller’s card.</p>
        <p>When everyone has voted, everyone’s votes are revealed, and player scores are tallied automatically (more on that later).</p>

        <h2>3. End of turn</h2>
        <p>All of the cards used during the turn are discarded. Each player receives one new card to replenish their hand.</p>
        <p>A new player becomes storyteller, and the new turn begins. That’s it! Rinse and repeat.</p>

        <h2>How scoring works</h2>
        <h3>Scenario #1: All players voted for storyteller’s card</h3>
        <p>If all players voted for the storyteller’s card or if no players voted for the storyeller’s card:</p>
        <ul>
          <li>The storyeller does not score points.</li>
          <li>The other players each score 2 points.</li>
        </ul>

        <h3>Scenario #2: No players voted for storyteller’s card</h3>
        <p>Same as previous scenario.</p>

        <h3>Scenario #3: Some but not all players voted for storyteller’s card</h3>
        <p>If some but not all players voted for the storyteller’s card:</p>
        <ul>
          <li>The storyeller scores 3 points.</li>
          <li>Players who guessed the storyteller’s card each score 3 points.</li>
          <li>Players who did not guess the storyteller’s card do not score points.</li>
        </ul>

        <h3>Other ways to score</h3>
        <p>Each player (except the storyteller) scores 1 bonus point for each vote received on their own card.</p>

        <div css={{ textAlign: 'center', margin: `${spacing.large}px 0px` }}>
          <button onClick={handleClose}>I get it now!</button>
        </div>
      </div>
    </Lightbox>
  )
}