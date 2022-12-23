/** @jsxImportSource @emotion/react */

import { PlayerState } from "../../types";
import Checkmark from "../svg/Checkmark";
import LoadingSpinner from "../svg/LoadingSpinner";

export default function PlayerStateIcon({ state }: { state: PlayerState }) {

  switch (state) {
    case 'done':
      return <Checkmark />
    case 'choosing':
      return <LoadingSpinner />
    case 'guessing':
      return <LoadingSpinner />
    default: return <div />;
  }
}