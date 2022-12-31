/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme'
import { PlayerType } from '../../types'
import Flex from '../layout/Flex'
import Avatar from './Avatar'

export default function Players({
  localUser,
  players,
  className,
  showStatus = true
}: {
  players: PlayerType[]
  className?: any
  showStatus?: boolean
}) {
  return (
    <Flex justify="center" css={className}>
      {players.map((player, index) => (
        <div key={index} css={{ margin: `0px ${spacing.default}px` }}>
          <Avatar
            username={player.name}
            avatarUrl={player.imgixPath}
            score={player.score}
            status={showStatus ? player.status : false}
            localUser={localUser}
          />
        </div>
      ))}
    </Flex>
  )
}
