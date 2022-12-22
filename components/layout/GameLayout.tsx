/** @jsxImportSource @emotion/react */

import { ReactNode, useState } from "react";
import { spacing } from "../../styles/theme";
import OpenBook from "../svg/OpenBook";
import Flex from "./Flex";
import HowToPlay from "../HowToPlay";
import Menu from "../svg/Menu";
import Overlay from "./Overlay";
import Link from "next/link";
import Home from "../svg/Home";

function ExpandedMenu({ handleClose }: { handleClose: () => void }) {
  const [showHowToPlay, toggleHowToPlay] = useState(false);
  return (
    showHowToPlay ?
      <HowToPlay handleClose={() => toggleHowToPlay(false)} />
      : (
        <Overlay handleClose={handleClose}>
          <h1 css={{ textAlign: 'center', paddingTop: spacing.large }}>MENU</h1>
          <div css={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <Link href="/">
              <Flex align='center'>
                <Home />
                <h2 css={{ marginLeft: spacing.xSmall }}>
                  Create new game
                </h2>
              </Flex>
            </Link>
            <Flex align='center' css={{ cursor: 'pointer' }} onClick={() => toggleHowToPlay(true)}>
              <OpenBook />
              <h2 css={{ marginLeft: spacing.xSmall }}>
                How to play
              </h2>
            </Flex>
          </div>
        </Overlay>
      )
  )
}

export function GameNav() {
  const [showMenu, toggleMenu] = useState(false);

  return (
    <div css={{ position: 'relative', width: '100%', zIndex: 1 }}>
      {showMenu ?
        <ExpandedMenu handleClose={() => toggleMenu(false)} />
        : (
          <Flex
            align='center'
            css={{ position: 'absolute', left: spacing.large, cursor: 'pointer' }}
            onClick={() => toggleMenu(true)}
          >
            <Menu />
            <h4 css={{ marginLeft: spacing.xSmall }}>
              MENU
            </h4>
          </Flex>
        )}
    </div>
  )
}

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <GameNav />
      {children}
    </div>
  )
}