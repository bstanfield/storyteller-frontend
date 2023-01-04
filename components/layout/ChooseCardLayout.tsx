/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme'
import { ReactNode, useEffect, useState } from 'react'
import Players from '../game/Players'
import { PlayerType } from '../../types'

export default function ChooseCardLayout({
  children,
  preheaderText,
  headerText,
  topMatter,
  players,
  cardModePreference,
  localUser
}: {
  children?: ReactNode
  preheaderText?: string
  headerText: string
  topMatter?: ReactNode
  players: PlayerType[]
}) {
  return (
    <div
      css={{
        overflowX: cardModePreference !== 'fanned' ? 'auto' : 'hidden',
        textAlign: 'center',
        padding: spacing.medium,
        position: 'relative',
        width: '100%',
        height: '100vh'
      }}
    >
      {topMatter}
      <h1 css={{ opacity: 0.5, margin: 0 }}>{preheaderText}</h1>
      <h1 className="pulsing" css={{ marginTop: spacing.xSmall }}>
        {headerText}
      </h1>
      {children}
      <Players
        localUser={localUser}
        players={players}
        css={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          margin: `${spacing.large}px auto`
        }}
      />
    </div>
  )
}
