/** @jsxImportSource @emotion/react */

import { scale } from '../styles/scale';
import { staticImageUrl } from '../lib/images';
import Smile from '../components/svg/Smile';
import { spacing } from '../styles/theme';

const avatarStyle = scale({
  width: [80, 80, 90, 90],
  aspectRatio: '1 / 1',
  borderRadius: '100%',
});


const boldText = { textTransform: 'uppercase', fontWeight: 700, margin: 0 };


export default function Avatar(
  { avatarUrl, username, score }:
    { avatarUrl?: string, username?: string, score?: number }
) {

  // has image or no image
  return avatarUrl && username ? (
    <div>
      <div
        css={[avatarStyle, {
          backgroundImage: `url(${staticImageUrl(`cards/${avatarUrl}`, { w: 160 })})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',

        }]}
      />
      <p css={[boldText, { marginTop: spacing.small }]}>
        {username}
      </p>
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