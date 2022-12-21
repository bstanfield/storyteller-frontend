/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../lib/helpers'
import { useEffect, useState } from 'react'

const cardStyles = (slug) => scale({
  width: 250,
  height: 380,
  backgroundColor: 'black',
  borderRadius: 14,
  backgroundImage: `url('https://storyteller.imgix.net/cards/${slug}?w=500')`,
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