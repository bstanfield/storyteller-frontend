/** @jsxImportSource @emotion/react */

import { spacing } from "../../styles/theme";
import { Player } from "../../types";
import Flex from "../layout/Flex";
import Avatar from "./Avatar";

export default function Players({ players, className }: { players: Player[], className?: any }) {
  return (
    <Flex
      justify='center'
      css={className}
    >
      {players.map((player, index) => (
        <div key={index} css={{ margin: `0px ${spacing.default}px` }}>
          <Avatar
            username={player.username}
            avatarUrl={player.avatarUrl}
            score={1}
            state={player.state}
          />
        </div>
      ))}
    </Flex>
  )
}