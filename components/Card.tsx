/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../styles/scale';
import { useEffect, useState } from 'react'
import { staticImageUrl } from '../lib/images'
import { CARD_WIDTHS } from '../config/constants';

const cardStyles = (slug) => scale({
  width: CARD_WIDTHS,
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

export default function Card({ slug, className }: { slug: string, className?: any }) {

  return (
    <div
      css={cardStyles(slug)}
      className={className}
    >
    </div>
  )


}