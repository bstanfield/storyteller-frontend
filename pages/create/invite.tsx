/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from 'react'
import Header from '../../components/header'
import socketIOClient from 'socket.io-client'
import TextInput from '../../components/TextInput'
import Flex from '../../components/layout/Flex'
import { spacing } from '../../styles/theme'
import { ENDPOINT } from '../../lib/helpers'
import Avatar from '../../components/game/Avatar'
import {
  MAX_PLAYER_COUNT,
  MIN_PLAYER_COUNT,
  TESTING_INVITEES
} from '../../config/constants'
import CreateGameLayout from '../../components/layout/CreateGameLayout'
import queryString from 'query-string'
import Link from 'next/link'

const addPlayerToGame = async (gameSlug, playerId) => {
  const res = await fetch(
    `${ENDPOINT}/game/add-player?game_slug=${gameSlug}&player_id=${playerId}`
  )
  return res
}

export default function Invite() {
  const [gameSlug, setGameSlug] = useState<any>(false)
  const [username, setUsername] = useState<any>(false)
  const [playerId, setPlayerId] = useState<any>(false)
  const [players, setPlayers] = useState<any>([])
  const [socketConnection, setSocketConnection] = useState<any>()
  const [start, setStart] = useState<any>(false)

  const emptyAvatarCount = MAX_PLAYER_COUNT - players.length
  const emptyAvatars = Array(emptyAvatarCount).fill({})

  // Get game id from url
  useEffect(() => {
    const parsed = queryString.parse(location.search)
    if (parsed.game) {
      setGameSlug(parsed.game)
    }
  }, [])

  useEffect(() => {
    if (gameSlug && playerId) {
      const connection = socketIOClient(ENDPOINT)
      setSocketConnection(connection)

      connection.on('connect', () => {
        connection.emit('join', { player_id: playerId, game: gameSlug })
      })

      connection.on('players', (data) => {
        setPlayers(data)
      })

      // When the game starts, redirect to the game page
      connection.on('start', () => {
        window.location.href = `/game/${gameSlug}`
      })

      return () => {
        connection.disconnect()
      }
    }
  }, [gameSlug, playerId])

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
    setPlayerId(localStorage.getItem('playerId'))
  }, [])

  useEffect(() => {
    if (playerId && gameSlug) {
      addPlayerToGame(gameSlug, playerId)
    }
  }, [playerId, gameSlug])

  useEffect(() => {
    if (start && socketConnection) {
      socketConnection.emit('start', { game: gameSlug })
    }
  }, [start, socketConnection])

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
            width: 900
          }}
        >
          <h1>Invite your friends!</h1>

          <Flex justify="center">
            <h3 css={{ marginRight: spacing.default }}>Invite link:</h3>
            <TextInput value={`storyteller.ai/${gameSlug}`} readOnly />
          </Flex>
          {/* TODO:  <div
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              margin: `${spacing.large}px 0px`
            }}> */}
          <Flex
            justify="space-between"
            css={{ margin: `${spacing.large}px 0px` }}
          >
            {players.map((player, index) => (
              <Avatar
                key={index}
                username={player.name}
                avatarUrl={player.imgixPath}
              />
            ))}
            {emptyAvatars.map((player, index) => (
              <Avatar key={index} />
            ))}
          </Flex>
          {/* if players >= MIN_PLAYER_COUNT, enable button */}
          <button
            onClick={() =>
              players.length < 2 ? alert('Not enough players!') : setStart(true)
            }
          >
            Start Game
          </button>
          {players.length < MIN_PLAYER_COUNT ? (
            <p>
              Need at least {MIN_PLAYER_COUNT - players.length} more player
              {MIN_PLAYER_COUNT - players.length > 1 ? 's' : ''}
            </p>
          ) : (
            <p>{MAX_PLAYER_COUNT} player maximum.</p>
          )}
        </div>
      </div>
    </Fragment>
  )
}

Invite.getLayout = function getLayout(page) {
  return <CreateGameLayout>{page}</CreateGameLayout>
}
