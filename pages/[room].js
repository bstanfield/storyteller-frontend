/** @jsx jsx */

import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT, formatScores } from "../lib/helpers";
import smoothscroll from "smoothscroll-polyfill";
import styles from "../lib/boardStyles";
import Header from "../components/header";
import Button from "../components/button";
import { useRouter } from 'next/router'

export default function Room() {
  const [room, setRoom] = useState(null);
  const [data, setData] = useState(false);
  const [socketConnection, setSocketConnection] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [players, setPlayers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])

  // Search query hook
  const router = useRouter();

  useEffect(() => {
    if (router.query.puzzle) {
      setPuzzleQuery(router.query.puzzle);

      // Now, remove URL param
      router.replace(`/${room}?puzzle`, `/${room}`, { shallow: true });
    }
  }, [router])

  useEffect(() => {
    const path = window.location.pathname;
    let room = false;
    if (path) {
      room = path.split("/")[1];
      setRoom(room);
    }

    const connection = socketIOClient(ENDPOINT);
    setSocketConnection(connection);

    smoothscroll.polyfill();

    connection.on("reject", () => {
      window.location.href = `/`;
    });

    connection.on("connect", () => {
      connection.emit("join", room);

      // Attempting to fix tab unfocus issue
      if (username) {
        connection.emit("name", username);
      }
    });

    connection.on("id", (id) => {
      setClientId(id);
    });

    // Sends board time once on connect
    connection.on("timestamp", (time) => {
      setTimestamp(time);
    });

    // Perhaps this should just be passed as a property of "scores"?
    connection.on("completed", (time) => {
      if (time) {
        setCompletedAtTimestamp(time);
      }
    });

    connection.on("filled", (time) => {
      if (time) {
        setFilledAtTimestamp(time);
      }
    });

    connection.on("guesses", (data) => {
      setInitialGuesses(data);
    });

    connection.on("data", (gameData) => {
      setData(gameData);
    });

    connection.on("loading", (boolean) => {
      setLoading(boolean);

      // Reset stuff
      setFocus(false);
      setHighlightedSquares([]);
      setHoveredClue(false);
      setSelectedSquare(false);
      setGuestHighlights(false);
      setShowIncorrect(false);
      setFilledAtTimestamp(false);
      setCompletedAtTimestamp(false);
    });

    // Good
    connection.on("inputChange", (data) => {
      setGuestInputChange(data);
    });

    // Good
    connection.on("newPlayer", (data) => {
      setPlayers(data);
    });

    // Sends at end of game to show guest scores
    // Good for now...
    connection.on("scores", (data) => {
      setScores(data);
      if (data && data.incorrects && data.incorrects.length == 0) {
        setShowFinishScreen(true);
      }
    });

    return () => connection.disconnect();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkName(input);
    }
  };

  // IMPORTANT TODO: remove guesses from <Square/>
  const checkName = (name) => {
    if (name.length <= 6) {
      setName(input);
      localStorage.setItem("username", input);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (i) => {
    if (i.nativeEvent.data) {
      return setInput(input + i.nativeEvent.data);
    } else if (i.nativeEvent.data === null) {
      return setInput(input.slice(0, -1));
    }
  };

  console.log('data: ', data);
  console.log('loading: ', loading);
  console.log('connection: ', socketConnection);
  if (loading || !socketConnection) {
    return (
      <div css={[styles.appBackground(), { height: "100vh" }]}>
        <Header props={{ isLoading: true }} />
        <div css={styles.loadingSpinner}>
          <div css={styles.loadingRing}>
            <div></div>
            <div></div>
          </div>
          {username ? (
            <p>
              Joining as <b>{username}</b>...
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div css={{ textAlign: 'center' }}>
        <br />
        <br />
        <h1>Welcome to {room} room</h1>
        <h2>You're socket ID is {clientId}</h2>
        <h2>Your username is {username}</h2>
      </div>
    )
  }
}
