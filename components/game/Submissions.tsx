/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale';
import Card from './Card';
import { spacing } from '../../styles/theme';
import { SMALL_CARD_WIDTHS } from '../../config/constants';
import { SubmittedCard } from '../../types';

const ownerCaption = {
  position: 'relative',
  fontSize: 12,
  display: 'block',
  textTransform: 'uppercase',
  fontWeight: 700,
  color: 'white',
};

export default function Submissions({ cards, handleCardClick }
  : { cards: SubmittedCard[], handleCardClick?: (slug: string) => void }
) {
  return (
    <div
      css={scale({
        display: 'grid',
        gridTemplateColumns: [
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          `repeat(${Math.ceil(cards.length / 2)}, 1fr)`,
          `repeat(${cards.length}, 1fr)`
        ],
        gridGap: spacing.small,
        margin: 'auto',
      })}
    >
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <Card
              slug={card.imgixPath}
              onClick={handleCardClick}
              css={scale({
                width: SMALL_CARD_WIDTHS,
                margin: 'auto',
                border: card.isStoryteller && '5px solid #5D24FF'
              })}
            >
              {card.owner && !card.isStoryteller && (
                <>
                  <div
                    css={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                  />
                  <caption css={[ownerCaption, {
                    textAlign: 'left',
                    marginLeft: spacing.small,
                    paddingTop: spacing.small,
                  }]}>
                    {card.owner.username}’s card
                  </caption>
                </>
              )}
              {card.isStoryteller &&
                <caption css={[ownerCaption, { position: 'absolute', top: -24 }]}>
                  {card.owner.username}’s card
                </caption>
              }
            </Card>
          </div>
        )
      })}
    </div>
  )
}