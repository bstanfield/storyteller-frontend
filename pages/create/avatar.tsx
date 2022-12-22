/** @jsxImportSource @emotion/react */

import { Fragment } from "react";
import Header from "../../components/header";
import Avatar from "../../components/game/Avatar";
import Link from "next/link";
import { spacing } from "../../styles/theme";
import { TESTING_IMAGES } from "../../config/constants";
import Flex from "../../components/layout/Flex";
import CreateGameLayout from "../../components/layout/CreateGameLayout";

export default function ChooseAvatar() {
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
          <h1>Hi, Name.</h1>
          <h1>Choose an avatar:</h1>
          <Flex wrap justify='space-around' css={{ margin: `${spacing.medium}px 0px` }}>
            {TESTING_IMAGES.slice(1, 7).map(avatar => (
              <Link
                href="/create/invite"
                css={{ textDecoration: 'none !important', border: 'none', '&:hover': { border: 'none' } }}
              >
                <Avatar avatarUrl={avatar} />
              </Link>
            ))}
          </Flex>
          <h3>Tap an avatar to select it.</h3>
        </div>
      </div>
    </Fragment>
  );
}

ChooseAvatar.getLayout = function getLayout(page) {
  return (
    <CreateGameLayout>
      {page}
    </CreateGameLayout>
  )
}