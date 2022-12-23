/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../lib/helpers";
import smoothscroll from "smoothscroll-polyfill";
import { TESTING_IMAGES, TESTING_INVITEES, TESTING_SAMPLE_HAND } from '../../config/constants';
import Hand from '../../components/game/Hand';
import Avatar from '../../components/game/Avatar';
import Flex from "../../components/layout/Flex";
import GameLayout from "../../components/layout/GameLayout";
import EnterClue from "../../components/lightbox/EnterClue";
import { spacing } from "../../styles/theme";

export default function Game() {
  const [game, setGame] = useState(null);
  const [data, setData] = useState(false);
  const [socketConnection, setSocketConnection] = useState();
  const [clientId, setClientId] = useState(false);
  const [players, setPlayers] = useState(TESTING_INVITEES);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

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
        {/* <EnterClue handleClose={() => 'void'} slug={TESTING_IMAGES[0]} /> */}
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