import { css } from "@emotion/react";
import facepaint from "facepaint";

// Media queries and Emotion CSS
export const mq = facepaint([
  "@media(min-width: 520px)",
  "@media(min-width: 750px)",
  "@media(min-width: 1100px)",
  "@media(min-width: 1500px)",
]);

export const scale = (x) => css(mq(x));
