/** @jsxImportSource @emotion/react */

import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import Header from "../../components/header";
import CreateGameLayout from "../../components/layout/CreateGameLayout";
import TextInput from "../../components/TextInput";

export default function Username() {
  const [name, setName] = useState('');
  return (
    <Fragment>
      <Header />
      <div
        css={{
          width: '100%',
          height: ' 100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            textAlign: "center",
            margin: "auto",
            width: 400
          }}
        >
          <h1>What's your name?</h1>
          <p>Create a new game</p>
          <TextInput
            autofocus
            value={name}
            onChange={(i) => setName(i)}
            placeholder="Enter a name"
          />
          <Link href="/create/avatar">
            <button>Save</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

Username.getLayout = function getLayout(page) {
  return (
    <CreateGameLayout>
      {page}
    </CreateGameLayout>
  )
}