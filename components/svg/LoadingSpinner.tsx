/** @jsxImportSource @emotion/react */

export default function LoadingSpinner(props) {
  const { width = 20, color = 'white', speed = 3, ...restOfProps } = props;
  return (
    <svg
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      {...restOfProps}
    >
      <path
        opacity=".25"
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
        fill={color}
      />
      {/* <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" fill={color}> */}
      <path d="M16 2C16 0.895431 15.1011 -0.0129078 14.0051 0.124785C10.4972 0.565512 7.21278 2.1598 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16H4C4 12.8174 5.26428 9.76516 7.51472 7.51472C9.29032 5.73912 11.5651 4.57742 14.0092 4.16624C15.0984 3.98299 16 3.10457 16 2V2Z" fill="url(#paint0_linear_209_237)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur={speed}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient id="paint0_linear_209_237" x1="16" y1="2" x2="2.5" y2="13" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
