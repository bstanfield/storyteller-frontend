/** @jsxImportSource @emotion/react */

import { Fragment } from "react";
import Header from "../../components/header";
import TextInput from "../../components/TextInput";
import Flex from "../../components/layout/Flex";
import { spacing } from "../../styles/theme";
import Avatar from "../../components/game/Avatar";
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT, TESTING_INVITEES } from "../../config/constants";
import CreateGameLayout from "../../components/layout/CreateGameLayout";

const invitees = TESTING_INVITEES;

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

Invite.getLayout = function getLayout(page) {
  return (
    <CreateGameLayout>
      {page}
    </CreateGameLayout>
  )
}