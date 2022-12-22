/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import Header from "../../components/header";
import { spacing } from "../../styles/theme";

export default function Index() {
  const [name, setName] = useState('');
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
}
