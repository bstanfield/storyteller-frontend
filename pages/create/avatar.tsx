/** @jsxImportSource @emotion/react */

import { Fragment, useEffect, useState } from 'react'
import Header from '../../components/header'
import Avatar from '../../components/game/Avatar'
import { spacing } from '../../styles/theme'
import queryString from 'query-string'
import Flex from '../../components/layout/Flex'
import CreateGameLayout from '../../components/layout/CreateGameLayout'
import { ENDPOINT } from '../../lib/helpers'

const addAvatarToPlayer = async (playerId, avatarId, gameId) => {
  const res = await fetch(
    `${ENDPOINT}/create/avatar?player_id=${playerId}&avatar_id=${avatarId}`
  )
  if (res.ok) {
    window.location.href = `/create/invite?game=${gameId}`
  }
}

export default function ChooseAvatar() {
  const [username, setUsername] = useState('')
  const [playerId, setPlayerId] = useState('')
  const [gameId, setGameId] = useState<any>('')
  const [avatars, setAvatars] = useState<any>([])

  useEffect(() => {
    const parsed = queryString.parse(location.search)
    if (parsed.game) {
      setGameId(parsed.game)
    }
  }, [])

  useEffect(() => {
    const getAvatars = async () => {
      const res = await fetch(`${ENDPOINT}/avatars?game=${gameId}`)
      const data = await res.json()
      setAvatars(data.avatars)
    }

    getAvatars()
  }, [gameId])

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
    setPlayerId(localStorage.getItem('playerId'))
  }, [])

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
          <h1>Hi, {username}.</h1>
          <h1>Choose an avatar:</h1>
          <br />
          <br />
          <Flex
            wrap
            justify="space-around"
            css={{ margin: `${spacing.medium}px 0px` }}
          >
            {avatars?.map((avatar, index) => (
              <Avatar
                key={index}
                handleAvatarClick={() =>
                  addAvatarToPlayer(playerId, avatar.id, gameId)
                }
                avatarUrl={avatar.imgixPath}
              />
            ))}
          </Flex>
          <br />
          <br />
          <h3>Tap an avatar to select it.</h3>
        </div>
      </div>
    </Fragment>
  )
}

ChooseAvatar.getLayout = function getLayout(page) {
  return <CreateGameLayout>{page}</CreateGameLayout>
}
