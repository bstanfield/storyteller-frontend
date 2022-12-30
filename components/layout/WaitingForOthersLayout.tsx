/** @jsxImportSource @emotion/react */

import { spacing } from "../../styles/theme";
import { ReactNode } from "react";
import Players from "../game/Players";
import { CardType, Player } from "../../types";
import FannedHand from "../game/FannedHand";

export default function WaitingOnOthersLayout({
  topMatter,
  players,
  cards,
  round,
  cardModePreference,
  localUser,
}: {
  children?: ReactNode;
  topMatter?: ReactNode;
  players: Player[];
  cards: CardType[];
  round: any;
}) {
  return (
    <div
      css={{
        textAlign: "center",
        padding: spacing.medium,
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      {topMatter}
      <Players
        players={players}
        showStatus
        localUser={localUser}
        css={{
          margin: `${spacing.large}px auto`,
        }}
      />
      {round.submissions.playersThatHaveNotSubmitted && (
        <h3 className="pulsing">
          Waiting on {round.submissions.playersThatHaveNotSubmitted.length}{" "}
          player
          {round.submissions.playersThatHaveNotSubmitted.length > 1 ? "s" : ""}
          ...
        </h3>
      )}
      <div
        css={{
          // position: 'fixed', bottom: 100
          marginTop: spacing.large,
        }}
      >
        <FannedHand cards={cards} cardModePreference={cardModePreference} />
      </div>
    </div>
  );
}
