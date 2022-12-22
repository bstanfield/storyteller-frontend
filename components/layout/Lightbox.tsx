/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { spacing } from "../../styles/theme";
import Close from "../svg/Close";

export default function Lightbox(
  { handleClose, children }:
    { handleClose: () => void, children: ReactNode }
) {
  return (
    <div css={{ position: 'absolute', width: '100%', backdropFilter: 'blur(12px)', overflowY: 'scroll' }}>
      <div
        css={{ position: 'absolute', top: spacing.medium, right: spacing.medium, cursor: 'pointer' }}
        onClick={handleClose}
      >
        <Close />
      </div>
      {children}
    </div>
  )
}