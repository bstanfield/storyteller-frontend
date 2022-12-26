/** @jsxImportSource @emotion/react */

import { PlayerState } from "../../types";
import Checkmark from "../svg/Checkmark";
import LoadingSpinner from "../svg/LoadingSpinner";

export default function PlayerStateIcon({ state }: { state: PlayerState }) {

  switch (state) {
    case 'waiting':
      return <Checkmark />
    case 'playing':
      return <LoadingSpinner />
    default: return <div />;
  }
}