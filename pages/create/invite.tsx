/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import Header from "../../components/header";
import TextInput from "../../components/TextInput";
import Flex from "../../components/layout/Flex";
import { spacing } from "../../styles/theme";
import Avatar from "../../components/Avatar";
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from "../../config/constants";

const invitees = [
  {
    avatarUrl: 'zast_turtle_ninja_Baby_full_body_in_action_epic_scene_cinematic_3da00e06-aab3-48e0-982c-9e4a14a4a5f9.png',
    username: 'ben',
  },
  {
    avatarUrl: 'TenderlySharp_Pixel_art_is_too_good_for_you_e345c77c-abf1-4d46-acb7-be9e56d6ea88.png',
    username: 'scott',
  },
  {
    avatarUrl: 'karurosu_bread_75a51dfc-f9ca-448e-9485-843629e37a6b.png',
    username: 'cyndi',
  },
];

export default function Invite() {
  const emptyAvatarCount = MAX_PLAYER_COUNT - invitees.length;

  const emptyAvatars = Array(emptyAvatarCount).fill({});

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
              value="storyteller.ai/some-link"
              readOnly
            />
          </Flex>
          <Flex justify='space-between' css={{ margin: `${spacing.large}px 0px` }}>
            {invitees.map(invitee => (
              <Avatar username={invitee.username} avatarUrl={invitee.avatarUrl} />
            ))}
            {emptyAvatars.map(invitee => (
              <Avatar />
            ))}
          </Flex>
          {/* if invitees >= MIN_PLAYER_COUNT, enable button */}
          <button>Start Game</button>
          {invitees.length < MIN_PLAYER_COUNT
            ? (
              <p>
                Need at least {MIN_PLAYER_COUNT - invitees.length} more player{MIN_PLAYER_COUNT - invitees.length > 1 ? 's' : ''}
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
