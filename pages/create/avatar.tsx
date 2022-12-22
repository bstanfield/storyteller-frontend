/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import Header from "../../components/header";
import Flex from "../../components/layout/Flex";
import Link from "next/link";
import { spacing } from "../../styles/theme";

const avatars = [
  'purple',
  'pink',
  'green',
  'gray',
  'brown',
  'teal',
  'yellow',
  'blue'
];

export default function Avatar() {
  const [name, setName] = useState('');
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
          <div css={{ display: 'flex', justifyContent: 'space-between', margin: `${spacing.medium}px 0px` }}>
            {avatars.map(avatar => (
              <Link href="/create/invite" css={{ textDecoration: 'none !important' }}>
                <div
                  css={{
                    borderRadius: '100%',
                    width: 80,
                    height: 80,
                    backgroundColor: avatar,
                    cursor: 'pointer',
                  }}
                />
              </Link>
            ))}
          </div>
          <h3>Tap an avatar to select it.</h3>
        </div>
      </div>
    </Fragment>
  );
}
