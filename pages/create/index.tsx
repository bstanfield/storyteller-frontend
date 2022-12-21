/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import { scale, fonts, colors, ENDPOINT } from "../../lib/helpers";
import Header from "../../components/header";
import Card from "../../components/card";
import { spacing } from "../../styles/theme";

const images = [];

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

export default function Index() {
  const [name, setName] = useState('');
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
}
