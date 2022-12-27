/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale';
import { staticImageUrl } from '../../lib/images';
import Smile from '../svg/Smile';
import { spacing } from '../../styles/theme';
import { PlayerState } from '../../types';
import PlayerStateIcon from './PlayerStateIcon';
import Flex from '../layout/Flex';

const avatarStyle = scale({
  position: 'relative',
  width: [80, 80, 90, 90],
  aspectRatio: '1 / 1',
  borderRadius: '100%',
  margin: 'auto',
  transition: 'transform 0.2s ease-in-out',
});


const boldText = { textTransform: 'uppercase', fontWeight: 700, margin: 0 };


export default function Avatar(
  { avatarUrl, username, score, handleAvatarClick, status, className }:
    {
      avatarUrl?: string,
      username?: string,
      score?: number,
      handleAvatarClick?: () => void,
      status?: PlayerState,
      className?: any,
    }
) {

  return avatarUrl ? (
    <div
      onClick={() => {
        if (handleAvatarClick) { handleAvatarClick() }
      }}
      className={className}
    >
      <div
        className="avatar"
        css={[avatarStyle, {
          backgroundImage: `url(${staticImageUrl(`cards/${avatarUrl}`, { w: 160 })})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          cursor: handleAvatarClick ? 'pointer' : 'default',
          ':hover': {
            transform: handleAvatarClick ? 'scale(1.05)' : 'none',
          }
        }]}
      >
        {status &&
          <Flex
            css={{
              backgroundColor: '#040126',
              borderRadius: '100%',
              width: 'fit-content',
              padding: spacing.xSmall,
              position: 'absolute',
              top: -spacing.small,
              right: -spacing.small,
            }}
            align='center'
            justify='center'
          >
            <PlayerStateIcon state={status} />
          </Flex>
        }
      </div>
      {username &&
        <p css={[boldText, { marginTop: spacing.small }]}>
          {username}
        </p>
      }
      {score && <p css={boldText}>{score}</p>}
    </div>
  ) : (
    <div>
      <div
        css={[avatarStyle, {
          border: '3px dashed gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5
        }]}
      >
        <Smile />
      </div>
    </div>
  )


}