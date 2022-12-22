/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../styles/scale';
import { useEffect, useState } from 'react'
import { staticImageUrl } from '../lib/images'
import Smile from '../components/svg/Smile';

const avatarStyle = scale({
  width: [80, 80, 90, 110],
  aspectRatio: '1 / 1',
  borderRadius: '100%',
});


export default function Avatar(
  { avatarUrl, username }:
    { avatarUrl?: string, username?: string }
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
      <p>{username}</p>
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