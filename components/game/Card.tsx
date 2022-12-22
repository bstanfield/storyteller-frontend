/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale';
import { staticImageUrl } from '../../lib/images'
import { CARD_WIDTHS } from '../../config/constants';

const cardStyles = (slug, onClick) => scale({
  width: CARD_WIDTHS,
  aspectRatio: '1 / 1.5',
  backgroundColor: 'black',
  borderRadius: 14,
  backgroundImage: `url(${staticImageUrl(`cards/${slug}`, { w: 500 })})`,
  backgroundSize: 'cover, contain',
  backgroundRepeat: 'no-repeat',
  filter: 'drop-shadow(0 0 15px rgba(93, 36, 255, 0.5))',
  cursor: onClick ? 'pointer' : 'default',
  transition: '0.25s all ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
})

export default function Card({ slug, onClick, className }
  : { slug: string, onClick?: (slug: string) => void, className?: any }) {

  return (
    <div
      css={cardStyles(slug, onClick)}
      className={className}
      onClick={() => {
        if (onClick) {
          onClick(slug)
        }
      }}
    >
    </div>
  )


}