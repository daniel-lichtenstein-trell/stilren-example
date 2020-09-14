import React from "react";

// A good UI component should have a signature that as closely as possible resembles the underlying html element.
// With some default props.
export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      $borderWidth="1px"
      $borderStyle="solid"
      $borderColor="black"
      $mobileBorderStyle="dashed"
      $background="none"
      $opacityHover="0.5"
      $opacityActive="0.9"
      $cursor="pointer"
      {...props}
    />
  );
}
