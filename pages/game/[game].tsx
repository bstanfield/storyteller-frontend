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
import EndOfTurn from "../../components/game/EndOfTurn";

function getPhaseFromRoundData(
  playerId,
  {
    isStoryteller,
    clue,
    completedAt,
    playerStoryteller,
    submissions
  }: {
    isStoryteller: boolean,
    clue: string,
    completedAt: EpochTimeStamp,
    playerStoryteller: string
    submissions: any
  }) {

  if (completedAt) {
    return 'score'
  }

  if (submissions.playersThatHaveNotSubmitted?.length === 0) {
    return 'voting'
  }

  if (clue) {
    return 'choosing'
  }

  else return 'clue'
}

export default function Game() {
  const [game, setGame] = useState(null);
  const [socketConnection, setSocketConnection] = useState<any>();
  const [clientId, setClientId] = useState(false);
  const [player, setPlayer] = useState(TESTING_INVITEES[0]);
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
    submissions: [],
    storyteller: {}
  });
  const [phase, setPhase] = useState('');
  const [contenderCard, setContenderCard] = useState('');
  const [vote, setVote] = useState('');

  // Added by Ben:
  const [submittedCards, setSubmittedCards] = useState([]);

  console.log('roundData', roundData)
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
        const player = data.find(player => player.playerId === playerId);
        console.log('data', data)
        setPlayer(player);
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

  function handleSubmitClue(clue, imgixPath) {
    socketConnection.emit('clue', { clue, game });
    socketConnection.emit('submit card', { imgixPath, playerId, game });
    setRoundData({ ...roundData, clue });
  }

  function handleContenderSubmission(imgixPath) {
    socketConnection.emit('submit card', { imgixPath, playerId, game });
    setContenderCard(imgixPath);
  }

  // do something here
  function handleStartNextTurn() {
    socketConnection.emit('new round', { game });
  }

  useEffect(() => {
    if (vote !== '') {
      console.log('submitting vote!');
      socketConnection.emit('submit vote', { imagePath: vote, playerId, game });
    }
  }, [vote])

  useEffect(() => {
    console.log('round data: ', roundData);
    const phase = getPhaseFromRoundData(playerId, roundData);
    setPhase(phase);
  }, [roundData]);

  console.log('phase: ', phase);

  if (loading || !socketConnection) {
    return <div />
  }

  return (
    <GameLayout>
      <div css={{ textAlign: 'center', position: 'relative', width: '100%', height: '100vh' }}>
        {roundData.isStoryteller && (
          phase === 'clue' ? (
            <StorytellerChooseCard
              handleSubmitClue={(clue, imgixPath) => handleSubmitClue(clue, imgixPath)}
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
              round={roundData}
            />
          ) : phase === 'voting' ? (
            <OtherPlayersAreVoting
              players={players}
              submissions={roundData.submissions.playersThatHaveSubmitted}
            />
          ) : <div />)}
        {!roundData.isStoryteller && (
          phase === 'clue' ? (
            <ChooseCardLayout
              preheaderText='Hang tight.'
              headerText={`Waiting for ${roundData.storyteller.name}'s clue...`}
              players={players}
            >
              <div css={{ marginTop: spacing.xLarge }}>
                <FannedHand cards={hand} />
              </div>
            </ChooseCardLayout>
          ) : phase === 'choosing' && player.status === 'playing' ? (
            <GuesserChooseCard
              roundData={roundData}
              players={players}
              handleContenderSubmission={imgixPath => handleContenderSubmission(imgixPath)}
              cards={hand}
            />
          ) : phase === 'choosing' && player.status === 'waiting' ? (
            <WaitingOnOthersLayout
              topMatter={(
                <Clue
                  storyteller={roundData.storyteller.name}
                  clue={roundData.clue}
                />
              )}
              round={roundData}
              players={players}
              cards={hand}
            />
          ) : phase === 'voting' ? (
            <Voting
              storyteller={players[0].name}
              players={players}
              clue={roundData.clue}
              submissions={roundData.submissions.playersThatHaveSubmitted}
              handleSubmitVote={(slug) => setVote(slug)}
              vote={vote}
            />
          ) : <div />)}
        {phase === 'score' && (
          <EndOfTurn
            handleStartNextTurn={() => handleStartNextTurn()}
            players={players}
          />
        )}
      </div>
    </GameLayout>
  )
}