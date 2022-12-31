/** @jsxImportSource @emotion/react */

import { spacing } from '../../styles/theme'
import Flex from '../layout/Flex'
import LeftCarat from '../svg/LeftCarat'

// TODO: Fix <button> default styling so
// we can use the HTML element here instead of div

export default function Back({
  className,
  onClick
}: {
  className?: any
  onClick: () => void
}) {
  return (
    <div css={{ cursor: 'pointer' }} className={className}>
      <Flex align="center" justify="center" onClick={onClick}>
        <LeftCarat />
        <h4 css={{ marginLeft: spacing.small }}>Back</h4>
      </Flex>
    </div>
  )
}
