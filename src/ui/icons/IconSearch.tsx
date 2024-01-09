export function IconSearch({ size = 30 }: { size?: number }) {
  return (
    <svg
      fill="currentColor"
      strokeWidth="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={size}
      width={size}>
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z"></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M232 160a72 72 0 1 0 72 72 72 72 0 0 0-72-72Z"></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M283.64 283.64 336 336"></path>
    </svg>
  );
}
