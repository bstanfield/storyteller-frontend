/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../lib/helpers";
import { TESTING_INVITEES } from '../../config/constants';
import GameLayout from "../../components/layout/GameLayout";
import GuesserChooseCard from "../../components/game/GuesserChooseCard";
import StorytellerChooseCard from "../../components/game/StorytellerChooseCard";
import WaitingOnOthersLayout from "../../components/layout/WaitingForOthersLayout";
import { spacing } from "../../styles/theme";
import ChooseCardLayout from "../../components/layout/ChooseCardLayout";
import FannedHand from "../../components/game/FannedHand";
import Clue from "../../components/game/Clue";
import Voting from "../../components/game/Voting";
import OtherPlayersAreVoting from "../../components/game/OtherPlayersAreVoting";

function getPhaseFromRoundData({
  isStoryteller,
  clue,
  completedAt,
  playerStoryteller,
}: {
  isStoryteller: boolean,
  clue: string,
  completedAt: EpochTimeStamp,
  playerStoryteller: string
}) {
  if (completedAt) {
    return 'score'
  }
  if (clue) {
    return 'choosing' // or voting if submissions are in / cards have been played
  }
  else return 'clue'
}

export default function Game() {
  const [game, setGame] = useState(null);
  const [socketConnection, setSocketConnection] = useState<any>();
  const [clientId, setClientId] = useState(false);
  const [players, setPlayers] = useState(TESTING_INVITEES);
  const [playerId, setPlayerId] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [hand, setHand] = useState([]);

  const [roundData, setRoundData] = useState({
    isStoryteller: true,
    clue: '',
    completedAt: 0 as EpochTimeStamp,
    playerStoryteller: '',
    storyteller: {}
  });
  const [phase, setPhase] = useState('');
  const [contenderCard, setContenderCard] = useState('');
  const [vote, setVote] = useState('');

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
        console.log('hand', hand)
        setHand(hand);
      });

      connection.on("round", (data) => {
        const { playerStoryteller } = data;
        if (playerStoryteller === playerId) {
          setRoundData({
            ...data,
            isStoryteller: true
          });
        } else {
          setRoundData({
            ...data,
            isStoryteller: false
          });
        }
      });

      connection.on("loading", (boolean) => {
        setLoading(boolean);
      });

      connection.on("players", (data) => {
        setPlayers(data);
      });

      connection.on("clue", (clue) => {
        setRoundData({ ...roundData, clue });
      });

      return () => {
        connection.disconnect();
      }
    }
  }, [playerId, game]);

  function handleSubmitClue(clue) {
    socketConnection.emit('clue', { clue, game });
    setRoundData({ ...roundData, clue });
  }

  useEffect(() => {
    const phase = getPhaseFromRoundData(roundData);
    setPhase(phase);
  }, [roundData]);

  console.log('loading: ', loading);
  console.log('connection: ', socketConnection);
  console.log('phase: ', phase);

  if (loading || !socketConnection) {
    return <div />
  }

  return (
    <div css={{ textAlign: 'center', position: 'relative', width: '100%', height: '100vh' }}>
      {roundData.isStoryteller && (
        phase === 'clue' ? (
          <StorytellerChooseCard
            handleSubmitClue={clue => handleSubmitClue(clue)}
            players={players}
            cards={hand}
          />
        ) : phase === 'choosing' ? (
          <WaitingOnOthersLayout
            topMatter={(
              <div>
                <h4 css={{ fontWeight: 800, opacity: 0.5, margin: spacing.small }}>YOUR CLUE:</h4>
                <h1 css={{ marginTop: spacing.xSmall, margin: 0 }}>“{roundData.clue}”</h1>
              </div>
            )}
            players={players}
            cards={hand}
          />
        ) : phase === 'voting' ? (
          <OtherPlayersAreVoting
            players={players}
          />
        ) : <div />)}
      {!roundData.isStoryteller && (
        phase === 'choosing' && !contenderCard ?
          <GuesserChooseCard
            roundData={roundData}
            players={players}
            handleContenderSubmission={(slug) => setContenderCard(slug)}
            cards={hand}
          />
          : phase === 'choosing' && contenderCard ? (
            <WaitingOnOthersLayout
              topMatter={(
                <Clue
                  storyteller={roundData.storyteller.name}
                  clue={roundData.clue}
                />
              )}
              players={players}
              cards={hand}
            />
          ) : phase === 'clue' ? (
            <ChooseCardLayout
              preheaderText='Hang tight.'
              headerText={`Waiting for ${roundData.storyteller.name}'s clue...`}
              players={players}
            >
              <div css={{ marginTop: spacing.xLarge }}>
                <FannedHand cards={hand} />
              </div>
            </ChooseCardLayout>
          ) : phase === 'voting' ? (
            <Voting
              storyteller={players[0].name}
              players={players}
              clue={roundData.clue}
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