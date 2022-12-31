/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme'

const glowyBox = {
  // background: 'rgb(57,52,109)',
  background:
    'linear-gradient(0deg, rgba(57,52,109,0) 0%, rgba(57,52,109,1) 100%)',
  height: 120,
  width: '100%',
  maxWidth: 500,
  position: 'absolute',
  zIndex: 0,
  top: 0,
  left: '50%',
  transform: 'translate(-50%)'
}

export default function Clue({
  storyteller,
  clue
}: {
  storyteller: string
  clue: string
}) {
  return (
    <div>
      <div css={glowyBox} />
      <p
        css={{
          textTransform: 'uppercase',
          opacity: 0.5,
          fontWeight: 800,
          position: 'relative',
          margin: 0
        }}
      >
        {storyteller}’s clue:
      </p>
      <h2
        css={{
          position: 'relative',
          marginTop: spacing.xSmall,
          marginBottom: spacing.large
        }}
      >
        “{clue}”
      </h2>
    </div>
  )
}
