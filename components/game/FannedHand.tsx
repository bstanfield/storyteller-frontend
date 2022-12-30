/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale';
import Card from './Card';
import Flex from '../layout/Flex';
import { CARD_WIDTHS } from '../../config/constants';
import { CardType } from '../../types';
import { useEffect, useState } from 'react';

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

export default function FannedHand({ cards, cardModePreference, handleCardClick }: { cards: CardType[], handleCardClick?: (slug: string) => void }) {
  console.log('card mode preference: ', cardModePreference);
  return (
    <div css={{  overflowX: cardModePreference === 'fanned' ? 'visible' : 'scroll', width: '100%' }}>
      <Flex
        justify='space-between'
        align='center'
        css={scale({
          position: 'relative',
          maxWidth: cardModePreference === 'fanned' ? '90%' : 'none',
          width: cardModePreference === 'fanned' ? CARD_WIDTHS.map(width => width * cards.length) : 'fit-content',
          margin: 'auto',
          boxSizing: 'border-box'
        })}
      >
        {cards.map((card, index) => {
          const rotationAngle = angleForIndex(index, cards.length);
          const topOffset = topForIndex(index, cards.length);

          if (cardModePreference === 'jumbo') {
            return (
              <Card
                size="jumbo"
                key={index}
                slug={card.imgixPath}
                onClick={handleCardClick}
              />
            )
          }

          // Default fanned card layout
          return (
            <Card
              type="fanned"
              key={index}
              slug={card.imgixPath}
              css={scale({
                left: `${(index * (100 / cards.length))}%`,
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