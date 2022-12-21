/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../lib/helpers'
import { useEffect, useState } from 'react'
import { staticImageUrl } from '../lib/images'


const avatarStyle = {
  width: 80,
  aspectRatio: '1 / 1',
  borderRadius: '100%',
}


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
          border: '2px dotted gray',
        }]}
      />
    </div>
  )


}