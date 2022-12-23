/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../lib/helpers";
import smoothscroll from "smoothscroll-polyfill";
import { TESTING_IMAGES, TESTING_INVITEES, TESTING_SAMPLE_HAND, TESTING_STORYTELLER } from '../../config/constants';
import GameLayout from "../../components/layout/GameLayout";
import GuesserChooseCard from "../../components/game/GuesserChooseCard";
import StorytellerChooseCard from "../../components/game/StorytellerChooseCard";
import WaitingOnOthersLayout from "../../components/layout/WaitingForOthersLayout";
import { spacing } from "../../styles/theme";
import ChooseCardLayout from "../../components/layout/ChooseCardLayout";
import FannedHand from "../../components/game/FannedHand";
import Clue from "../../components/game/Clue";
import LoadingSpinner from "../../components/svg/LoadingSpinner";
import Voting from "../../components/game/Voting";

export default function Game() {
  const [game, setGame] = useState(null);
  const [data, setData] = useState(false);
  const [socketConnection, setSocketConnection] = useState<any>();
  const [clientId, setClientId] = useState(false);
  const [players, setPlayers] = useState(TESTING_INVITEES);
  const [playerId, setPlayerId] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [clue, setClue] = useState('');
  const [isStoryteller, setIsStoryteller] = useState(false);
  const [vote, setVote] = useState('')

  useEffect(() => {
    const path = window.location.pathname;
    let game = '';
    if (path) {
      game = path.split("/")[2];
      setGame(game);
    }

    setUsername(localStorage.getItem("username"));
    setPlayerId(localStorage.getItem("playerId"));
  }, [])

  useEffect(() => {
    if (playerId && game) {
      const connection = socketIOClient(ENDPOINT);
      setSocketConnection(connection);

      connection.on("connect", () => {
        connection.emit("join", { player_id: playerId, game });

        // Request round info
        connection.emit("round", { game });
      });

      connection.on("id", (id) => {
        setClientId(id);
      });

      connection.on("hand", (hand) => {
        console.log('hand: ', hand);
      });

      connection.on("round", (data) => {
        //if playerStoryteller = playerId, then isStoryteller = true
        const { playerStoryteller, clue, completedAt } = data;
        if (playerStoryteller === playerId) {
          setIsStoryteller(true);
        } else {
          setIsStoryteller(false);
        }
      });

      connection.on("loading", (boolean) => {
        setLoading(boolean);
      });

      connection.on("players", (data) => {
        setPlayers(data);
      });

      return () => {
        connection.disconnect();
      }
    }
  }, [playerId, game]);

  console.log('data: ', data);
  console.log('loading: ', loading);
  console.log('connection: ', socketConnection);


  if (loading || !socketConnection) {
    return <div />
  }

  const phase = 'voting';
  const contendersSubmitted = true;
  const votingSubmitted = vote;

  // phases: 
  // clue giving
  // choosing cards
  // voting
  // scoring

  // storyteller states:
  // need to give clue
  // gave clue && waiting for picks
  // waiting for votes
  // score screen

  // guesser states:
  // waiting on clue
  // choosing cards
  // voting
  // score screen

  return (
    <div css={{ textAlign: 'center', position: 'relative', width: '100%', height: '100vh' }}>
      {isStoryteller && (
        phase === 'clue' ? (
          <StorytellerChooseCard handleSubmitClue={clue => setClue(clue)} players={players} />
        ) : phase === 'choosing' ? (
          <WaitingOnOthersLayout
            topMatter={(
              <div>
                <h4 css={{ fontWeight: 800, opacity: 0.5, margin: spacing.small }}>YOUR CLUE:</h4>
                <h1 css={{ marginTop: spacing.xSmall, margin: 0 }}>“{clue}”</h1>
              </div>
            )}
            headerText={clue}
            players={players}
          />
        ) : phase === 'voting' ? (
          <div />
        ) : <div />)}
      {!isStoryteller && (
        phase === 'choosing' && !contendersSubmitted ?
          <GuesserChooseCard clue={clue} players={players} />
          : phase === 'choosing' && contendersSubmitted ? (
            <WaitingOnOthersLayout
              topMatter={(
                <Clue storyteller={TESTING_STORYTELLER.username} clue={clue} />
              )}
              headerText={clue}
              players={players}
            />
          ) : phase === 'clue' ? (
            <ChooseCardLayout
              preheaderText='Hang tight.'
              headerText='Waiting for storyteller’s clue...'
              players={players}
            >
              <div css={{ marginTop: spacing.xLarge }}>
                <FannedHand cards={TESTING_SAMPLE_HAND} />
              </div>
            </ChooseCardLayout>
          ) : phase === 'voting' ? (
            <Voting
              storyteller={players[0].name}
              players={players}
              clue={clue}
              handleSubmitVote={(slug) => setVote(slug)}
              vote={vote}
            />
          ) : <div />)}
    </div>
  )
}

// if storyteller:
// specific text + see your hand screen -- cards are clickable √
// click card -> enter clue lightbox √
// jump to shared waiting screen √
// players are voting screen -- storyteller specific
// jump to shared end screen

// if guesser:
// waiting for storyteller screen √
// choose card text + see hand screen -- cards are clickable √
// click card -> confirm card lightbox √
// - if 3 person game
// - choose one more card text + see hand screen -- cards are clickable
// - click card -> confirm card lightbox √
// jump to shared waiting screen
// place your vote -- cards are clickable
// click card -> confirm card lightbox √
// your vote is in -- cards NOT clickable
// jump to shared end screen

// shared:
// waiting for card selections -- cards NOT clickable √
// - some text changes between storyteller and guesser √
// end screen -- cards NOT clickable

Game.getLayout = function getLayout(page) {
  return (
    <GameLayout>
      {page}
    </GameLayout>
  )
}