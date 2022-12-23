/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale';
import Card from './Card';
import Flex from '../layout/Flex';
import { CARD_WIDTHS } from '../../config/constants';


// this mostly works for hands between 5-7 cards large.
// no guarantees for smaller or larger hand sizes!
const MAX_ROTATIONAL_ANGLE = 16;

// alt (Math.pow(index, 2)) - ((handSize - 1) * index) + 30;
function topForIndex(index, handSize) {
  const bigScreen = Math.pow(handSize - 1, 1.8) * Math.pow(index - ((handSize - 1) / 2), 2)
  const smallScreen = (6 * Math.pow(index, 2)) - (6 * (handSize - 1) * index) + handSize * 12;
  return [smallScreen, smallScreen, bigScreen, bigScreen];
}

function angleForIndex(index, handSize) {
  return (MAX_ROTATIONAL_ANGLE * 2 / (handSize - 1)) * index - MAX_ROTATIONAL_ANGLE
}

export default function FannedHand({ cards, handleCardClick }: { cards: string[], handleCardClick?: (slug: string) => void }) {
  return (
    <div css={{ width: '100%' }}>
      <Flex
        justify='center' align='center'
        css={scale({
          position: 'relative',
          maxWidth: '90%',
          width: CARD_WIDTHS.map(width => width * cards.length),
          aspectRatio: '4/1',
          margin: 'auto',
          boxSizing: 'border-box'
        })}
      >
        {cards.map((card, index) => {
          const position = index;
          const rotationAngle = angleForIndex(index, cards.length);
          const topOffset = topForIndex(index, cards.length);

          return (
            <Card
              key={index}
              slug={card}
              css={scale({
                left: `${(position * (100 / cards.length))}%`,
                top: topOffset,
                position: 'absolute',
                transform: `rotate(${rotationAngle}deg)`,
                '&:hover': {
                  transform: `rotate(${rotationAngle}deg) scale(1.02)`
                }
              })}
              onClick={handleCardClick}
            />
          )
        })}
      </Flex>
    </div>
  )
}