/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from "react";
import Header from "../../components/header";
import TextInput from "../../components/TextInput";
import Flex from "../../components/layout/Flex";
import { spacing } from "../../styles/theme";
import { ENDPOINT } from "../../lib/helpers";
import Avatar from "../../components/game/Avatar";
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT, TESTING_INVITEES } from "../../config/constants";
import CreateGameLayout from "../../components/layout/CreateGameLayout";
import queryString from "query-string";
import Link from "next/link";

const addPlayerToGame = async (gameSlug, playerId) => {
  const res = await fetch(`${ENDPOINT}/game/add-player?game_slug=${gameSlug}&player_id=${playerId}`);
  return res;
}

export default function Invite() {
  const [gameSlug, setGameSlug] = useState<any>(false);
  const [username, setUsername] = useState<any>(false);
  const [playerId, setPlayerId] = useState<any>(false);
  const [players, setPlayers] = useState<any>([]);

  const emptyAvatarCount = MAX_PLAYER_COUNT - players.length;
  const emptyAvatars = Array(emptyAvatarCount).fill({});

  // Get game id from url
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.game) {
      setGameSlug(parsed.game);
    }
  }, []);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setPlayerId(localStorage.getItem("playerId"));
  }, [])

  useEffect(() => {
    if (playerId && gameSlug) {
      addPlayerToGame(gameSlug, playerId);
    }
  }, [playerId, gameSlug]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameSlug) {
        const getPlayersInGame = async () => {
          const res = await fetch(`${ENDPOINT}/game/players?game_slug=${gameSlug}`);
          const data = await res.json();
          console.log('data: ', data);
          setPlayers(data.players);
        }
        // Get players in game
        getPlayersInGame();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [gameSlug]);

  return (
    <Fragment>
      <Header />
      <div
        css={{
          width: '100%',
          height: ' 100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            textAlign: "center",
            margin: "auto",
            width: 900
          }}
        >
          <h1>Invite your friends!</h1>

          <Flex justify='center'>
            <h3 css={{ marginRight: spacing.default }}>Invite link:</h3>
            <TextInput
              value={`storyteller.ai/${gameSlug}`}
              readOnly
            />
          </Flex>
          <Flex justify='space-between' css={{ margin: `${spacing.large}px 0px` }}>
            {players.map((player, index) => (
              <Avatar key={index} username={player.name} avatarUrl={player.imgix_path} />
            ))}
            {emptyAvatars.map((player, index) => (
              <Avatar key={index} />
            ))}
          </Flex>
          {/* if players >= MIN_PLAYER_COUNT, enable button */}
          <Link href={`/game/${gameSlug}`}><button>Start Game</button></Link>
          {players.length < MIN_PLAYER_COUNT
            ? (
              <p>
                Need at least {MIN_PLAYER_COUNT - players.length} more player{MIN_PLAYER_COUNT - players.length > 1 ? 's' : ''}
              </p>
            ) : (
              <p>{MAX_PLAYER_COUNT} player maximum.</p>
            )
          }
        </div>
      </div>
    </Fragment>
  );
}

Invite.getLayout = function getLayout(page) {
  return (
    <CreateGameLayout>
      {page}
    </CreateGameLayout>
  )
}