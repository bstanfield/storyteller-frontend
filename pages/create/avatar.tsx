/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import Header from "../../components/header";
import Avatar from "../../components/Avatar";
import Link from "next/link";
import { spacing } from "../../styles/theme";
import queryString from "query-string";
import { TESTING_IMAGES } from "../../config/constants";
import Flex from "../../components/layout/Flex";
import CreateGameNav from "../../components/layout/CreateGameLayout";
import CreateGameLayout from "../../components/layout/CreateGameLayout";
export default function ChooseAvatar() {
  const [name, setName] = useState('');

  const [username, setUsername] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [gameId, setGameId] = useState<any>('');

  // Get game id from url
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.game) {
      setGameId(parsed.game);
    }
  }, []);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setPlayerId(localStorage.getItem("playerId"));
  }, [])

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
          <h1>Hi, {username}.</h1>
          <h1>Choose an avatar:</h1>
          <Flex wrap justify='space-around' css={{ margin: `${spacing.medium}px 0px` }}>
            {TESTING_IMAGES.slice(1, 7).map(avatar => (
              <Link
                href={`/create/invite?game=${gameId}`}
                css={{ textDecoration: 'none !important', border: 'none', '&:hover': { border: 'none' } }}
              >
                <Avatar avatarUrl={avatar} />
              </Link>
            ))}
          </Flex>
          <h3>Tap an avatar to select it.</h3>
        </div>
      </div>
    </Fragment >
  );
}

ChooseAvatar.getLayout = function getLayout(page) {
  return (
    <CreateGameLayout>
      {page}
    </CreateGameLayout>
  )
}