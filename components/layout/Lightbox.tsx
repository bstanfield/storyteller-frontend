/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { spacing } from "../../styles/theme";
import Close from "../svg/Close";

export default function Lightbox(
  { handleClose, children }:
    { handleClose: () => void, children: ReactNode }
) {
  return (
    <div css={{ position: 'absolute', width: '100%', backdropFilter: 'blur(30px)', overflowY: 'scroll', backgroundColor: 'rgba(4, 1, 38, 0.5)', zIndex: 2, height: '100%', minHeight: '100vh' }}>
      <div
        css={{ position: 'absolute', top: spacing.large, left: spacing.large, cursor: 'pointer' }}
        onClick={handleClose}
      >
        <Close />
      </div>
      {children}
    </div>
  )
}