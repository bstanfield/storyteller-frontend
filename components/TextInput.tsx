/** @jsxImportSource @emotion/react */

import { scale, fonts, colors } from "../lib/helpers";

const textInput = scale({
  padding: "16px 60px 16px 24px",
  border: `1px solid ${colors.slate}`,
  borderRadius: 8,
  fontFamily: fonts.monospace,
  "&::placeholder": {
    fontFamily: fonts.monospace,
  },
  color: colors.slate,
  fontSize: 20,
  width: '100%',
  maxWidth: 300,
  marginBottom: 18,
});

export default function TextInput({
  autofocus = false,
  onChange,
  value,
  placeholder,
  readOnly = false,
}: {
  autofocus?: boolean,
  onChange?: () => void;
  placeholder?: string,
  value: string,
  readOnly?: boolean,
}) {
  return (
    <input
      autoFocus={autofocus}
      css={textInput}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      readOnly={readOnly}
    />
  );
}
