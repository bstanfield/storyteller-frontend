/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../lib/helpers'
import { useEffect, useState } from 'react'
import { staticImageUrl } from '../lib/images'

const cardStyles = (slug) => scale({
  width: [200, 200, 200, 224, 248],
  aspectRatio: '1 / 1.5',
  backgroundColor: 'black',
  borderRadius: 14,
  backgroundImage: `url(${staticImageUrl(`cards/${slug}`, { w: 500 })})`,
  backgroundSize: 'cover, contain',
  backgroundRepeat: 'no-repeat',
  filter: 'drop-shadow(0 0 15px rgba(93, 36, 255, 0.5))',
  cursor: 'pointer',
  transition: '0.25s all ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
})

export default function Card(props) {

  return (
    <div
      css={cardStyles(props.slug)}
    >
    </div>
  )


}