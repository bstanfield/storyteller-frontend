/** @jsxImportSource @emotion/react */

import { scale } from "../../styles/scale";
import Card from "./Card";
import { spacing } from "../../styles/theme";
import { SMALL_CARD_WIDTHS } from "../../config/constants";
import { SubmittedCard } from "../../types";
import Players from "./Players";
import Avatar from "./Avatar";
import Flex from "../layout/Flex";

const ownerCaption = (show) => ({
  position: "relative",
  fontSize: 12,
  display: show ? "block" : "none",
  textTransform: "uppercase",
  fontWeight: 700,
  color: "white",
});

export default function Submissions({
  cards,
  players,
  storyteller,
  votes,
  handleCardClick,
}: {
  cards: SubmittedCard[];
  handleCardClick?: (slug: string) => void;
}) {
  return (
    <div
      css={scale({
        display: "grid",
        gridTemplateColumns: [
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          `repeat(${Math.ceil(cards.length / 2)}, 1fr)`,
          `repeat(${cards.length}, 1fr)`,
        ],
        gridGap: spacing.small,
        margin: "auto",
      })}
    >
      {cards.map((card, index) => {
        return (
          <div key={index} css={{ position: "relative" }}>
            <Card
              slug={card.imgixPath}
              onClick={handleCardClick}
              css={scale({
                width: SMALL_CARD_WIDTHS,
                margin: "auto",
                border: card.isStoryteller && "5px solid #5D24FF",
              })}
            >
              {card.name !== storyteller && (
                <>
                  <div
                    css={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                  <caption
                    css={[
                      ownerCaption(votes),
                      {
                        textAlign: "left",
                        marginLeft: spacing.small,
                        paddingTop: spacing.small,
                      },
                    ]}
                  >
                    {card.name}’s card
                  </caption>
                </>
              )}
              {storyteller === card.name && (
                <caption
                  css={[
                    ownerCaption(votes),
                    { position: "absolute", top: -24 },
                  ]}
                >
                  {card.name}’s card
                </caption>
              )}
            </Card>
            {players && votes && (
              <Flex
                align="center"
                css={{
                  position: "absolute",
                  bottom: -spacing.xLarge,
                  left: "50%",
                  transform: "translate(-50%)",
                }}
              >
                {votes.map((vote) => (
                  <div key={index} css={{ margin: `0px ${spacing.default}px` }}>
                    {vote.submitterPlayerGamesId === card.playerGamesId && (
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
                          ".avatar": {
                            width: [40, 40, 50, 50],
                          },
                          p: {
                            marginTop: spacing.xSmall,
                            fontSize: "11px",
                          },
                        })}
                      />
                    )}
                  </div>
                ))}
              </Flex>
            )}
          </div>
        );
      })}
    </div>
  );
}
