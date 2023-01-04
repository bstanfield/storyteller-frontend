/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale'
import { spacing } from '../../styles/theme'
import { PlayerType } from '../../types'
import Flex from '../layout/Flex'
import LeftCarat from '../svg/LeftCarat'
import Avatar from './Avatar'

const playersBox = (cardModePreference) =>
  scale({
    display: 'flex',
    margin: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    width: 'fit-content'
  })

const stickyBox = (cardModePreference) =>
  scale({
    width: '100%',
    height: 'fit-content',
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium,
    position: cardModePreference === 'fanned' ? 'absolute' : 'sticky',
    backgroundColor:
      cardModePreference === 'fanned' ? 'transparent' : 'rgb(3, 0, 37, 0.9)',
    bottom: cardModePreference === 'fanned' ? 12 : 0,
    backdropFilter: cardModePreference === 'fanned' ? 'none' : 'blur(15px)',
    margin: 'auto'
  })

export default function Players({
  localUser,
  players,
  cardModePreference,
  className,
  showStatus = true
}: {
  players: PlayerType[]
  className?: any
  showStatus?: boolean
}) {
  return (
    <div css={stickyBox(cardModePreference)}>
      <Flex justify="center" css={playersBox(cardModePreference)}>
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
    </div>
  )
}
