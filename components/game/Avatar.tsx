/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale'
import { staticImageUrl } from '../../lib/images'
import Smile from '../svg/Smile'
import { spacing } from '../../styles/theme'
import { PlayerState } from '../../types'
import PlayerStateIcon from './PlayerStateIcon'
import Flex from '../layout/Flex'

const avatarStyle = scale({
  position: 'relative',
  width: [80, 80, 90, 90],
  aspectRatio: '1 / 1',
  borderRadius: '100%',
  margin: 'auto',
  transition: 'transform 0.2s ease-in-out'
})

const boldText = { textTransform: 'uppercase', fontWeight: 700, margin: 0 }

export default function Avatar({
  avatarUrl,
  username,
  score,
  handleAvatarClick,
  status,
  localUser,
  className
}: {
  avatarUrl?: string
  username?: string
  score?: number
  handleAvatarClick?: () => void
  status?: PlayerState
  className?: any
}) {
  return avatarUrl ? (
    <div
      onClick={() => {
        if (handleAvatarClick) {
          handleAvatarClick()
        }
      }}
      className={className}
    >
      <div
        className="avatar"
        css={[
          avatarStyle,
          {
            backgroundImage: `url(${staticImageUrl(`cards/${avatarUrl}`, {
              w: 160
            })})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            cursor: handleAvatarClick ? 'pointer' : 'default',
            ':hover': {
              transform: handleAvatarClick ? 'scale(1.05)' : 'none'
            }
          }
        ]}
      >
        {status?.verb && (
          <Flex
            css={{
              backgroundColor: '#040126',
              borderRadius: '100%',
              width: 'fit-content',
              padding: spacing.xSmall,
              position: 'absolute',
              top: -spacing.small,
              right: -spacing.small
            }}
            align="center"
            justify="center"
          >
            <PlayerStateIcon state={status?.verb} />
          </Flex>
        )}
      </div>
      {username && (
        <div
          css={{
            marginTop: spacing.small,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {status?.isStoryteller && (
            <div
              css={{
                display: 'inline-block',
                position: 'relative',
                backgroundColor: '#FF7A24',
                width: 20,
                height: 20,
                margin: 'auto',
                borderRadius: '50%',
                marginRight: 4,
                border: '1px solid #bb4a00'
              }}
            >
              <span
                css={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 1,
                  fontWeight: 800,
                  fontSize: '70%',
                  color: 'rgb(3, 0, 37) !important'
                }}
              >
                ★
              </span>
            </div>
          )}
          <p css={boldText}>{username}</p>
          <p
            css={[
              boldText,
              {
                height: 10,
                fontSize: '12px',
                lineHeight: 0.8,
                marginLeft: 4,
                color: 'rgb(88, 218, 42)'
              }
            ]}
          >
            {localUser?.username === username && '(you)'}
          </p>
        </div>
      )}
      {score && <p css={boldText}>{score}</p>}
    </div>
  ) : (
    <div>
      <div
        css={[
          avatarStyle,
          {
            border: '3px dashed gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.5
          }
        ]}
      >
        <Smile />
      </div>
    </div>
  )
}
