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
import Hand from "../../components/game/Hand";
import Clue from "../../components/game/Clue";

export default function Game() {
  const [game, setGame] = useState(null);
  const [data, setData] = useState(false);
  const [socketConnection, setSocketConnection] = useState();
  const [clientId, setClientId] = useState(false);
  const [players, setPlayers] = useState(TESTING_INVITEES);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [clue, setClue] = useState('asdf');

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])

  useEffect(() => {
    const path = window.location.pathname;
    let game = '';
    if (path) {
      game = path.split("/")[2];
      setGame(game);
    }

    const connection = socketIOClient(ENDPOINT);
    setSocketConnection(connection);

    smoothscroll.polyfill();

    // connection.on("reject", () => {
    //   window.location.href = `/`;
    // });

    connection.on("connect", () => {
      connection.emit("join", game);

      if (username) {
        connection.emit("name", username);
      }
    });

    connection.on("id", (id) => {
      setClientId(id);
    });

    connection.on("data", (gameData) => {
      setData(gameData);
    });

    connection.on("loading", (boolean) => {
      setLoading(boolean);
    });

    // Good
    connection.on("newPlayer", (data) => {
      setPlayers(data);
    });

    return () => {
      connection.disconnect();
    }
  }, [username]);

  console.log('data: ', data);
  console.log('loading: ', loading);
  console.log('connection: ', socketConnection);

  const isStoryteller = false;
  const isWaiting = true;

  if (loading || !socketConnection) {
    return <div />
  }
  return (
    <div css={{ textAlign: 'center', position: 'relative', width: '100%', height: '100vh' }}>
      {isStoryteller && (
        clue ? (
          <StorytellerChooseCard handleSubmitClue={clue => setClue(clue)} players={players} />
        ) : (
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
        ))}
      {!isStoryteller && (
        clue && !isWaiting ?
          <GuesserChooseCard clue={clue} players={players} />
          : clue && isWaiting ? (
            <WaitingOnOthersLayout
              topMatter={(
                <Clue storyteller={TESTING_STORYTELLER.username} clue={clue} />
              )}
              headerText={clue}
              players={players}
            />
          ) : (
            <ChooseCardLayout
              preheaderText='Hang tight.'
              headerText='Waiting for storyteller’s clue...'
              players={players}
            >
              <div css={{ marginTop: spacing.xLarge }}>
                <Hand cards={TESTING_SAMPLE_HAND} />
              </div>
            </ChooseCardLayout>
          ))}
    </div>
  )
}

// if storyteller:
// specific text + see your hand screen -- cards are clickable
// click card -> enter clue lightbox √
// jump to shared waiting screen
// players are voting screen -- storyteller specific
// jump to shared end screen

// if guesser:
// waiting for storyteller screen
// choose card text + see hand screen -- cards are clickable
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
// waiting for card selections -- cards NOT clickable
// - some text changes between storyteller and guesser
// end screen -- cards NOT clickable

Game.getLayout = function getLayout(page) {
  return (
    <GameLayout>
      {page}
    </GameLayout>
  )
}