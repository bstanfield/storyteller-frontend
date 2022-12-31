/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../../components/header'
import CreateGameLayout from '../../components/layout/CreateGameLayout'
import TextInput from '../../components/TextInput'
import { ENDPOINT } from '../../lib/helpers'
import queryString from 'query-string'

export default function Username() {
  const [name, setName] = useState('')
  const [gameSlug, setGameSlug] = useState<any>('')

  // Get game id from url
  useEffect(() => {
    const parsed = queryString.parse(location.search)
    if (parsed.game) {
      setGameSlug(parsed.game)
    }
  }, [])

  const submitUsername = async (name) => {
    if (name) {
      const res = await fetch(`${ENDPOINT}/create/username?username=${name}`)
      const data = await res.json()
      if (data.error) {
        alert('Error creating user')
        setName('')
      } else {
        // Replace with cookie system later
        localStorage.setItem('username', data.username)
        localStorage.setItem('playerId', data.player_id)
        window.location.href = `/create/avatar?game=${gameSlug}`
      }
    }
  }

  return (
    <Fragment>
      <Header />
      <div
        css={{
          width: '100%',
          height: ' 100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          css={{
            textAlign: 'center',
            margin: 'auto',
            width: 400
          }}
        >
          <h1>What's your name?</h1>
          <TextInput
            autofocus
            value={name}
            onChange={(i) => setName(i)}
            placeholder="Enter a name"
          />
          <button onClick={() => submitUsername(name)}>Save</button>
        </div>
      </div>
    </Fragment>
  )
}

Username.getLayout = function getLayout(page) {
  return <CreateGameLayout>{page}</CreateGameLayout>
}
