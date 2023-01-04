/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale'
import { spacing } from '../../styles/theme'
import { PlayerType } from '../../types'
import Flex from '../layout/Flex'
import Avatar from './Avatar'

const playersBox = scale({
  position: 'absolute',
  display: 'flex',
  margin: 'auto',
  left: 0,
  right: 0,
  bottom: [12, 12, 12, 24],
  width: 'fit-content'
})

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
    <Flex justify="center" css={playersBox}>
      {players.map((player, index) => (
        <div key={index} css={{ margin: `0px ${spacing.default}px` }}>
          <Avatar
            username={player.name}
            avatarUrl={player.imgixPath}
            formerScore={player.formerScore}
            showFormerScore={!showStatus}
            score={player.score}
            status={showStatus ? player.status : false}
            localUser={localUser}
          />
        </div>
      ))}
    </Flex>
  )
}
