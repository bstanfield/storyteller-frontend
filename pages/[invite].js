/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/header'
import CreateGameLayout from '../components/layout/CreateGameLayout'
import TextInput from '../components/TextInput'
import { ENDPOINT } from '../lib/helpers'
import queryString from 'query-string'
import { keyframes } from '@emotion/react'
import { scale } from '../styles/scale'

// TODO: MOVE THIS LATER
const loadingSpinner = () =>
  scale({
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    textAlign: 'center',
    height: 200,
    width: 400
  })

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `

const loadingRing = scale({
  display: 'inline-block',
  position: 'relative',
  width: '80px',
  height: '80px',
  div: {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    width: '64px',
    height: '64px',
    margin: '8px',
    border: '8px solid #333',
    borderRadius: '50%',
    animation: `${spinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: 'white transparent transparent transparent'
  },
  'div:nth-child(1)': {
    animationDelay: '-0.45s'
  },
  'div:nth-child(2)': {
    animationDelay: '-0.3s'
  },
  'div:nth-child(3)': {
    animationDelay: '-0.15s'
  }
})

export default function InviteLanding() {
  const [name, setName] = useState('')
  const [gameSlug, setGameSlug] = useState('')
  const [validGameCode, setValidGameCode] = useState(null)

  const checkGame = async (game) => {
    const res = await fetch(`${ENDPOINT}/secret?game=${game.toUpperCase()}`)
    const data = await res.json()
    if (data.error) {
      alert('Invalid game')
      setValidGameCode(false)
    } else {
      setValidGameCode(true)
    }
  }

  // Get game id from url
  useEffect(() => {
    if (window.location.pathname) {
      setGameSlug(window.location.pathname.split('/')[1].toUpperCase())
      checkGame(window.location.pathname.split('/')[1].toUpperCase())
    }
  }, [])

  useEffect(() => {
    if (validGameCode) {
      // Check if the user has a username is localStorage
      const username = localStorage.getItem('username')
      if (username) {
        // Send user to game
        window.location.href = `/create/invite?game=${gameSlug}`
      } else {
        // Send user to username page
        window.location.href = `/create/username?game=${gameSlug}`
      }
    } else if (validGameCode === false) {
      alert('Invalid game code')
      // Send the user back to the homepage
      window.location.href = '/'
    }
  }, [validGameCode])

  return (
    <Fragment>
      <Header />
      <div css={{ height: '100vh' }}>
        <div css={loadingSpinner}>
          <div css={loadingRing}>
            <div></div>
            <div></div>
          </div>
          <p css={{ fontWeight: 800, fontSize: 22 }}>
            Pulling up a chair for you...
          </p>
        </div>
      </div>
    </Fragment>
  )
}

InviteLanding.getLayout = function getLayout(page) {
  return <CreateGameLayout>{page}</CreateGameLayout>
}
