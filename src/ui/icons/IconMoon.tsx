export function IconMoon({ size = 30, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg
      fill="none"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      height={size}
      width={size}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}
