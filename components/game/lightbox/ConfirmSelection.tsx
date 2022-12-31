/** @jsxImportSource @emotion/react */

import Card from '../Card'
import Overlay from '../../layout/Overlay'
import Flex from '../../layout/Flex'

import { spacing } from '../../../styles/theme'
import { scale } from '../../../styles/scale'
import { LIGHTBOX_CARD_WIDTHS } from '../../../config/constants'
import Back from '../../button/Back'

export default function ConfirmSelection({
  slug,
  handleClose,
  handleSubmit
}: {
  slug: string
  handleClose: () => void
  handleSubmit: () => void
}) {
  return (
    <Overlay handleClose={handleClose}>
      <Flex
        justify="center"
        align="center"
        css={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div>
          <Card slug={slug} css={scale({ width: LIGHTBOX_CARD_WIDTHS })} />
          <div
            css={{
              position: 'relative',
              textAlign: 'center',
              marginTop: spacing.default
            }}
          >
            <button onClick={handleSubmit}>Choose card</button>
            <Back
              onClick={handleClose}
              css={{
                position: 'absolute',
                left: -spacing.xxLarge,
                top: -spacing.xxSmall
              }}
            />
          </div>
        </div>
      </Flex>
    </Overlay>
  )
}
