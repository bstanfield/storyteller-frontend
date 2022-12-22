/** @jsxImportSource @emotion/react */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import { ENDPOINT } from "../lib/helpers";
import TextInput from "../components/TextInput";
import Header from "../components/header";
import Card from "../components/card";
import { spacing } from "../styles/theme";
import Link from "next/link";

const images = [
  'zast_turtle_ninja_Baby_full_body_in_action_epic_scene_cinematic_3da00e06-aab3-48e0-982c-9e4a14a4a5f9.png',
  'TenderlySharp_Pixel_art_is_too_good_for_you_e345c77c-abf1-4d46-acb7-be9e56d6ea88.png',
  'karurosu_bread_75a51dfc-f9ca-448e-9485-843629e37a6b.png',
  'Lisawesa_A_child_in_a_white_spacesuitintricate_detailshttpswww._af68f8f1-e2d7-43b1-b601-d481c605fc7a.png',
  'Lyra_the_unstoppable_flow_of_sloth_VS_the_unstoppable_flow_of_t_a0359061-4827-4c8e-8627-a9ddad65dc8e.png',
  'Joseph_Is_Great_pixel_art_harbor_by_a_small_town_at_sunset_cada5b57-24db-40f7-92c7-72d7df5a3cdc.png',
  'Dinsdale__surreal_a8afacd7-c281-44bd-b77d-4ebdd860998c.png',
  'davidiskray_colorful_space_organic_spaceships_fantasy_space_sta_71d286a7-37c5-43e2-ae37-d3e7e0c7c138.png',
  'BrandonMc_A_medieval_anthropomorphic_ragdoll_calico_cat_wizard__e50274ac-cd5c-41d5-b6bf-51e37567dd21.png',
];

export default function Index() {
  const [room, setRoom] = useState("");
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])

  useEffect(() => {
    if (success) {
      if (username) {
        window.location.href = `/game/${room}`;
      } else {
        window.location.href = `/username?room=${room}`;
      }
    }
  }, [success]);

  const handleKeyDown = (e) => {
    if (e.room === "Enter") {
      checkRoom(room);
    }
  };

  const checkRoom = async (room) => {
    const res = await fetch(`${ENDPOINT}/secret?room=${room}`);
    const data = await res.json();
    if (data.error) {
      alert("Invalid room");
      setRoom("");
    } else {
      setSuccess(true);
    }
  };

  const handleChange = (i) => {
    if (i.nativeEvent.data) {
      return setRoom(room + i.nativeEvent.data);
    } else if (i.nativeEvent.data === null) {
      return setRoom(room.slice(0, -1));
    }
  };

  return (
    <Fragment>
      <Header />
      <div
        css={{
          display: 'flex'
        }}
      >
        <div
          css={{
            width: '60%',
            height: ' 100%',
          }}
        >
          <div
            css={{
              textAlign: "center",
              margin: "auto",
              width: 400
            }}
          >
            <img css={{ marginBottom: -30, width: 300 }} src="https://storyteller.imgix.net/storyteller-logo.png?w=450"></img>
            <h3 css={{ opacity: 0.9, marginBottom: 60 }}><i>Tell stories that match<br />AI-generated cards!</i></h3>

            <h3>Create a new game</h3>
            <Link href="/create/username">
              <button>Create game</button>
            </Link>
            <br />
            <br />

            <h3>Or, join an existing game</h3>
            <TextInput
              autoFocus
              // onKeyDown={handleKeyDown}
              value={room}
              onChange={(i) => handleChange(i)}
              placeholder="Your room"
            />
            <button onClick={() => checkRoom(room)} className="btn-purple">Join game</button>
            <p>Playing as <a href="">{username}</a></p>
          </div>
        </div>
        <div
          css={{
            height: '100vh',
          }}
        >
          <div css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: spacing.default,
            gridTemplateRows: 'masonry',
          }}>
            {images.map(image => <Card slug={image} />)}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
