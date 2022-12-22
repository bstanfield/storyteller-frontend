/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../lib/helpers";
import smoothscroll from "smoothscroll-polyfill";
import { useRouter } from 'next/router';
import { TESTING_INVITEES, TESTING_SAMPLE_HAND } from '../../config/constants';
import Hand from '../../components/Hand';
import Avatar from '../../components/Avatar';
import Flex from "../../components/layout/Flex";
import GameLayout from "../../components/layout/GameLayout";
import { spacing } from "../../styles/theme";

export default function Game() {
  const [game, setGame] = useState(null);
  const [data, setData] = useState(false);
  const [socketConnection, setSocketConnection] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [players, setPlayers] = useState(TESTING_INVITEES);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])

  // Search query hook
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    let game = false;
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

      // Attempting to fix tab unfocus issue
      if (username) {
        connection.emit("name", username);
      }
    });

    connection.on("id", (id) => {
      setClientId(id);
    });

    // Sends board time once on connect
    connection.on("timestamp", (time) => {
      setTimestamp(time);
    });

    // Perhaps this should just be passed as a property of "scores"?
    connection.on("completed", (time) => {
      if (time) {
        setCompletedAtTimestamp(time);
      }
    });

    connection.on("filled", (time) => {
      if (time) {
        setFilledAtTimestamp(time);
      }
    });

    connection.on("guesses", (data) => {
      setInitialGuesses(data);
    });

    connection.on("data", (gameData) => {
      setData(gameData);
    });

    connection.on("loading", (boolean) => {
      setLoading(boolean);
    });

    // Good
    connection.on("inputChange", (data) => {
      setGuestInputChange(data);
    });

    // Good
    connection.on("newPlayer", (data) => {
      setPlayers(data);
    });

    // Sends at end of game to show guest scores
    // Good for now...
    connection.on("scores", (data) => {
      setScores(data);
      if (data && data.incorrects && data.incorrects.length == 0) {
        setShowFinishScreen(true);
      }
    });

    return () => connection.disconnect();
  }, []);

  console.log('data: ', data);
  console.log('loading: ', loading);
  console.log('connection: ', socketConnection);

  if (loading || !socketConnection) {
    return (
      <div css={[{ height: "100vh", width: '100%' }]}>
        <div>
          <div>
            <div></div>
            <div></div>
          </div>
          {username ? (
            <p>
              Joining as <b>{username}</b>...
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div css={{ textAlign: 'center', position: 'relative', width: '100%', height: '100vh' }}>
        <h1>Welcome to game {game}</h1>
        <h3>Socket ID: {clientId}</h3>
        <h3>Username: {username}</h3>
        <Hand cards={TESTING_SAMPLE_HAND} />
        <Flex
          justify='space-between'
          css={{
            margin: `${spacing.large}px auto`,
            gap: spacing.default,
            width: 'fit-content',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)',
            bottom: spacing.medium,
          }}>
          {players.map((invitee, index) => (
            <Avatar key={index} username={invitee.username} avatarUrl={invitee.avatarUrl} score={1} />
          ))}
        </Flex>
      </div>
    )
  }
}

Game.getLayout = function getLayout(page) {
  return (
    <GameLayout>
      {page}
    </GameLayout>
  )
}