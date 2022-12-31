/** @jsxImportSource @emotion/react */

import { ReactNode, useEffect } from 'react'
import { spacing } from '../../styles/theme'
import Close from '../svg/Close'

export default function Overlay({
  handleClose,
  children
}: {
  handleClose: () => void
  children: ReactNode
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div
      css={{
        top: 0,
        position: 'fixed',
        width: '100%',
        backdropFilter: 'blur(30px)',
        overflowY: 'scroll',
        backgroundColor: 'rgba(4, 1, 38, 0.5)',
        zIndex: 99,
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <div
        css={{
          position: 'absolute',
          top: spacing.large,
          left: spacing.large,
          cursor: 'pointer'
        }}
        onClick={handleClose}
      >
        <Close />
      </div>
      {children}
    </div>
  )
}
