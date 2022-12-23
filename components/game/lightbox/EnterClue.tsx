/** @jsxImportSource @emotion/react */

import Card from "../Card";
import { spacing } from "../../../styles/theme";
import Overlay from "../../layout/Overlay";
import { useState } from "react";
import TextInput from "../../TextInput";
import Flex from "../../layout/Flex";

export default function EnterClue({ slug, handleClose }: { slug: string, handleClose: () => void }) {
  const [clue, setClue] = useState('');

  function handleSubmit() {
    console.log('clue', clue);
    handleClose();
  }

  return (
    <Overlay handleClose={handleClose}>
      <Flex justify="space-around" align='center' css={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <Card slug={slug} />
        <div css={{ width: 300, marginLeft: spacing.large }}>
          <h1>Enter a clue to describe this card.</h1>
          <TextInput
            value={clue}
            onChange={setClue}
            placeholder="A lucid dream"
          />
          <div css={{ textAlign: 'center' }}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </Flex>
    </Overlay>
  )
}