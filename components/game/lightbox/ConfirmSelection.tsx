/** @jsxImportSource @emotion/react */

import Card from "../Card";
import Overlay from "../../layout/Overlay";
import Flex from "../../layout/Flex";

import { spacing } from "../../../styles/theme";

export default function ConfirmSelection(
  { slug, handleClose, handleSubmit }:
    { slug: string, handleClose: () => void, handleSubmit: () => void }
) {

  return (
    <Overlay handleClose={handleClose}>
      <Flex justify="center" align='center' css={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div>
          <Card slug={slug} />
          <div css={{ textAlign: 'center', marginTop: spacing.default }}>
            <button onClick={handleSubmit}>Choose card</button>
          </div>
        </div>
      </Flex>
    </Overlay>
  )
}