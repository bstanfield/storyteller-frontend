/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale';
import Card from './Card';
import { spacing } from '../../styles/theme';
import { SMALL_CARD_WIDTHS } from '../../config/constants';
import { SubmittedCard } from '../../types';
import Players from './Players';
import Avatar from './Avatar';
import Flex from '../layout/Flex';

const ownerCaption = {
  position: 'relative',
  fontSize: 12,
  display: 'block',
  textTransform: 'uppercase',
  fontWeight: 700,
  color: 'white',
};

export default function Submissions({ cards, storyteller, votes, handleCardClick }
  : { cards: SubmittedCard[], handleCardClick?: (slug: string) => void }
) {
  console.log('votes', votes)
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
          <div key={index} css={{ position: 'relative' }}>
            <Card
              slug={card.imgixPath}
              onClick={handleCardClick}
              css={scale({
                width: SMALL_CARD_WIDTHS,
                margin: 'auto',
                border: card.isStoryteller && '5px solid #5D24FF'
              })}
            >
              {card.name !== storyteller  && (
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
                    {card.name}’s card
                  </caption>
                </>
              )}
              {storyteller === card.name &&
                <caption css={[ownerCaption, { position: 'absolute', top: -24 }]}>
                  {card.name}’s card
                </caption>
              }
            </Card>
            {card.voters &&
              <Flex
                align='center'
                css={{
                  position: 'absolute',
                  bottom: -spacing.xLarge,
                  left: '50%',
                  transform: 'translate(-50%)',
                }}
              >
                {card.voters.map((voter) =>
                  <div key={index} css={{ margin: `0px ${spacing.default}px` }}>
                    <Avatar
                      username={voter.username}
                      avatarUrl={voter.avatarUrl}
                      css={scale({
                        '.avatar': {
                          width: [40, 40, 50, 50],
                        },
                        p: {
                          marginTop: spacing.xSmall,
                          fontSize: '11px',
                        }
                      })}
                    />
                  </div>
                )}
              </Flex>
            }
          </div>
        )
      })}
    </div>
  )
}