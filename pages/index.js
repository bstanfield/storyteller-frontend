/** @jsx jsx */

import { useEffect, useState, Fragment } from "react";
import { jsx } from "@emotion/react";
import { scale, fonts, colors, ENDPOINT } from "../lib/helpers";
import Header from "../components/header";
import Card from "../components/card";

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

const textInput = scale({
  padding: "8px 9px 8px 9px",
  border: `1px solid ${colors.slate}`,
  borderRadius: 2,
  marginRight: 12,
  fontFamily: fonts.monospace,
  "&::placeholder": {
    fontFamily: fonts.monospace,
  },
});

export default function Index() {
  const [key, setKey] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      window.location.href = `/${key}`;
    }
  }, [success]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkKey(key);
    }
  };

  const checkKey = async (key) => {
    const res = await fetch(`${ENDPOINT}/secret?key=${key}`);
    const data = await res.json();
    if (data.error) {
      alert("Invalid key");
      setKey("");
    } else {
      setSuccess(true);
    }
  };

  const handleChange = (i) => {
    if (i.nativeEvent.data) {
      return setKey(key + i.nativeEvent.data);
    } else if (i.nativeEvent.data === null) {
      return setKey(key.slice(0, -1));
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
        {/* <input
          autoFocus
          onKeyDown={handleKeyDown}
          css={textInput}
          value={key}
          onChange={(i) => handleChange(i)}
          placeholder="Your key"
          type="text"
        ></input>
        <Button
          props={{
            onClickFn: () => checkKey(key),
            darkmode: false,
            text: "Enter",
            icon: { name: "enter-outline", size: 16 },
          }}
        /> */}

        <h3>Create a new game</h3>
        <button>Create game</button>

        <h3>Or, join an existing game</h3>
        <button className="btn-purple">Join game</button>
        </div>
        </div>
        <div
          css={{
            width: '40%',
            height: '100vh',
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <Card slug={images[5]} />
        </div>
      </div>
    </Fragment>
  );
}
