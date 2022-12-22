/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../styles/scale';
import { useEffect, useState } from 'react'
import { staticImageUrl } from '../lib/images'
import Card from './Card';
import Flex from './layout/Flex';


const MAX_ROTATIONAL_ANGLE = 16;

// alt (Math.pow(index, 2)) - ((handSize - 1) * index) + 30;
function topForIndex(index, handSize) {
  return (handSize - 1) * Math.pow(index - ((handSize - 1) / 2), 2)
  // return (6 * Math.pow(index, 2)) - (6 * (handSize - 1) * index) + handSize * 12;
}

function angleForIndex(index, handSize) {
  return (MAX_ROTATIONAL_ANGLE * 2 / (handSize - 1)) * index - MAX_ROTATIONAL_ANGLE
}

export default function Hand({ cards }: { cards: string[] }) {

  console.log(cards.map((c, i) => topForIndex(i, cards.length)))
  return (
    <div css={{ width: '100%' }}>
      <Flex
        justify='center' align='center'
        css={{ position: 'relative', width: '90%', boxSizing: 'border-box' }}
      >
        {cards.map((card, index) => {
          // const middleIndex = (cards.length + 1) / 2;
          const position = index;
          const rotationAngle = angleForIndex(index, cards.length);
          const topOffset = topForIndex(index, cards.length);

          return (
            <Card
              slug={card}
              css={{
                left: `${(position * (100 / cards.length))}%`,
                top: topOffset,
                position: 'absolute',
                transform: `rotate(${rotationAngle}deg)`,
                '&:hover': {
                  transform: `rotate(${rotationAngle}deg)`
                }
              }}
            />
          )
        })}
      </Flex>
    </div>
  )
}