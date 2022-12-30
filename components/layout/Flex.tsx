/** @jsxImportSource @emotion/react */

import { HTMLAttributes, ReactNode } from "react";
import { scale } from "../../styles/scale";

export type FlexProps = {
  align?: string;
  mobileAlign?: string;
  justify?: string;
  mobileJustify?: string;
  wrap?: boolean;
  inline?: boolean;
  direction?: string;
  mobileDirection?: string;
  className?: any;
  gap?: number | string | (number | string)[];
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Flex({
  align,
  mobileAlign = align,
  justify,
  mobileJustify = justify,
  wrap,
  inline = false,
  direction = "row",
  mobileDirection = direction,
  gap,
  children,
  ...props
}: FlexProps) {
  return (
    <div
      css={scale({
        display: inline ? "inline-flex" : "flex",
        alignItems: [mobileAlign, mobileAlign, align, align],
        justifyContent: [mobileJustify, mobileJustify, justify, justify],
        flexDirection: [mobileDirection, mobileDirection, direction, direction],
        flexWrap: wrap === true ? "wrap" : wrap,
        gap,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
