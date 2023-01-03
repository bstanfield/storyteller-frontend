/** @jsxImportSource @emotion/react */

import { scale } from '../../styles/scale'
import Card from './Card'
import { spacing } from '../../styles/theme'
import { SMALL_CARD_WIDTHS } from '../../config/constants'
import { SubmittedCard } from '../../types'
import Players from './Players'
import Avatar from './Avatar'
import Flex from '../layout/Flex'
import { Fragment } from 'react'

const ownerCaption = (show) => ({
  position: 'relative',
  fontSize: 12,
  display: show ? 'block' : 'none',
  textTransform: 'uppercase',
  fontWeight: 700,
  color: 'white'
})

export default function Submissions({
  cards,
  players,
  storyteller,
  votes,
  handleCardClick,
  localUser
}: {
  cards: SubmittedCard[]
  handleCardClick?: (slug: string) => void
}) {
  const isStoryteller = (card) =>
    storyteller?.toLowerCase() === card?.name?.toLowerCase()
  const isLocalUserCard = (card) => localUser?.playerId === card?.playerId

  console.log('votes: ', votes)
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
        gridGap: 48,
        margin: 'auto'
      })}
    >
      {cards.map((card, index) => {
        return (
          <div key={index} css={{ position: 'relative' }}>
            <Card
              slug={card.imgixPath}
              onClick={
                card.playerId === localUser?.playerId ? null : handleCardClick
              }
              css={scale({
                width: SMALL_CARD_WIDTHS,
                margin: 'auto',
                border: isStoryteller(card) && '5px solid #5D24FF',
                opacity: isLocalUserCard(card) ? 0.5 : 1,
                cursor: isLocalUserCard(card) ? 'not-allowed' : 'pointer'
              })}
            >
              {card?.name?.toLowerCase() !== storyteller?.toLowerCase() && (
                <>
                  <div
                    css={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute'
                    }}
                  />
                  <caption
                    css={[
                      ownerCaption(votes),
                      {
                        textAlign: 'left',
                        marginLeft: spacing.small,
                        paddingTop: spacing.small
                      }
                    ]}
                  >
                    {card.name}’s card
                  </caption>
                </>
              )}
              {isStoryteller(card) && (
                <Fragment>
                  {isStoryteller(card) && (
                    <div
                      css={{
                        position: 'absolute',
                        top: -60,
                        left: 0,
                        right: 0
                      }}
                    >
                      <div
                        css={{
                          display: 'inline-block',
                          position: 'relative',
                          backgroundColor: '#FF7A24',
                          width: 20,
                          height: 20,
                          margin: 'auto',
                          borderRadius: '50%',
                          marginRight: 4,
                          border: '1px solid #bb4a00'
                        }}
                      >
                        <span
                          css={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 1,
                            fontWeight: 800,
                            fontSize: '70%',
                            color: 'rgb(3, 0, 37) !important'
                          }}
                        >
                          ★
                        </span>
                      </div>
                    </div>
                  )}
                  <caption
                    css={[
                      ownerCaption(votes),
                      {
                        position: 'absolute',
                        top: -36,
                        left: 0,
                        right: 0,
                        fontSize: '110%'
                      }
                    ]}
                  >
                    {card.name}’s card
                  </caption>
                </Fragment>
              )}
            </Card>
            {players && votes && (
              <Flex
                align="center"
                css={{
                  position: 'absolute',
                  bottom: -spacing.xLarge,
                  left: '50%',
                  transform: 'translate(-50%)'
                }}
              >
                {votes.map((vote) => (
                  <div key={index} css={{ margin: `0px ${spacing.default}px` }}>
                    {vote.submitterPlayerGamesId === card.playerGamesId &&
                      vote.imgixPath === card.imgixPath && (
                        <Avatar
                          username={
                            players.find(
                              (player) =>
                                player.playerGamesId === vote.voterPlayerGamesId
                            ).name
                          }
                          avatarUrl={
                            players.find(
                              (player) =>
                                player.playerGamesId === vote.voterPlayerGamesId
                            ).imgixPath
                          }
                          css={scale({
                            '.avatar': {
                              width: [40, 40, 50, 50]
                            },
                            p: {
                              marginTop: spacing.xSmall,
                              fontSize: '11px'
                            }
                          })}
                        />
                      )}
                  </div>
                ))}
              </Flex>
            )}
          </div>
        )
      })}
    </div>
  )
}
