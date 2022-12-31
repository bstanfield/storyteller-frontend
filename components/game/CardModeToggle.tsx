/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale'
import { staticImageUrl } from '../../lib/images'
import { JUMBO_CARD_WIDTHS, CARD_WIDTHS } from '../../config/constants'
import { ReactNode, useEffect, useState } from 'react'

export default function CardModeToggle({
  cardModePreference,
  handleCardModePreference
}) {
  const cardModeImageStyles = scale({
    cursor: 'pointer',
    width: 50,
    height: 50,
    position: 'absolute',
    top: 32,
    right: 32,
    backgroundImage: `url(${staticImageUrl(
      cardModePreference === 'fanned' ? `jumbo-cards.png` : `gallery-cards.png`,
      { w: 300 }
    )})`,
    backgroundSize: 'cover, contain',
    transition: '0.25s all ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  })

  return <div css={cardModeImageStyles} onClick={handleCardModePreference} />
}
