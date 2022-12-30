/** @jsxImportSource @emotion/react */

import { ReactNode, useState } from "react";
import { spacing } from "../../styles/theme";
import OpenBook from "../svg/OpenBook";
import Flex from "./Flex";
import HowToPlay from "../HowToPlay";

export function CreateGameNav() {
  const [showHowToPlay, toggleHowToPlay] = useState(false);

  return (
    <div css={{ position: "relative", width: "100%" }}>
      {showHowToPlay ? (
        <HowToPlay handleClose={() => toggleHowToPlay(false)} />
      ) : (
        <Flex
          justify="center"
          css={{ position: "absolute", top: 0, width: "100%" }}
        >
          <Flex
            align="center"
            css={{
              position: "absolute",
              left: spacing.large,
              cursor: "pointer",
            }}
            onClick={() => toggleHowToPlay(true)}
          >
            <OpenBook />
            <h3 css={{ marginLeft: spacing.xSmall }}>How to play</h3>
          </Flex>
          <h3>Create a game</h3>
        </Flex>
      )}
    </div>
  );
}

export default function CreateGameLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <CreateGameNav />
      {children}
    </div>
  );
}
