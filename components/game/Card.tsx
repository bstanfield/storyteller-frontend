/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale'
import { staticImageUrl } from '../../lib/images'
import { JUMBO_CARD_WIDTHS, CARD_WIDTHS } from '../../config/constants'
import { ReactNode } from 'react'

const cardStyles = (slug, onClick, cardModePreference) =>
  scale({
    width: cardModePreference === 'fanned' ? CARD_WIDTHS : JUMBO_CARD_WIDTHS,
    margin: cardModePreference === 'fanned' ? 'none' : '0px 36px',
    aspectRatio: '1 / 1.5',
    backgroundColor: 'black',
    borderRadius: 14,
    backgroundImage: `url(${staticImageUrl(`cards/${slug}`, { w: 500 })})`,
    backgroundSize: 'cover, contain',
    backgroundRepeat: 'no-repeat',
    filter: 'drop-shadow(0 0 15px rgba(93, 36, 255, 0.5))',
    cursor: onClick ? 'pointer' : 'default',
    // '-ms-overflow-style': 'none',
    // scrollbarWidth: 'none',
    // webkitScrollbar: {
    //   display: 'none'
    // },
    transition: '0.25s all ease',
    '&:hover': {
      transform: 'scale(1.02)',
      zIndex: 2
    }
  })

export default function Card({
  cardModePreference,
  slug,
  onClick,
  className,
  children
}: {
  slug: string
  children?: ReactNode
  onClick?: (slug: string) => void
  className?: any
}) {
  return (
    <div
      css={cardStyles(slug, onClick, cardModePreference)}
      className={className}
      onClick={() => {
        if (onClick) {
          onClick(slug)
        }
      }}
    >
      {children}
    </div>
  )
}
