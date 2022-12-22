/** @jsxImportSource @emotion/react */

import { scale } from '../styles/scale';
import { colors, fonts } from '../styles/theme';
import { spacing } from "../styles/theme";

const textInput = scale({
  padding: spacing.default,
  border: `1px solid #C7C7C7`,
  borderRadius: 8,
  fontFamily: fonts.monospace,
  color: 'white',
  fontSize: 20,
  width: '100%',
  maxWidth: 300,
  marginBottom: 18,
  backgroundColor: colors.input,
  "&::placeholder": {
    fontFamily: fonts.monospace,
    color: '#C7C7C7',
  },
});

export default function TextInput({
  autofocus = false,
  onChange,
  value,
  placeholder,
  readOnly = false,
}: {
  autofocus?: boolean,
  onChange?: (i: string) => void;
  placeholder?: string,
  value: string,
  readOnly?: boolean,
}) {
  return (
    <input
      autoFocus={autofocus}
      css={textInput}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="text"
      readOnly={readOnly}
    />
  );
}
