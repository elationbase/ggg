export function IconSun({ size = 30, color = 'currentColor' }: { size?: number; color?: string }) {
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
      <path d="M12 7A5 5 0 1 0 12 17 5 5 0 1 0 12 7z"></path>
      <path d="M12 1 12 3"></path>
      <path d="M12 21 12 23"></path>
      <path d="M4.22 4.22 5.64 5.64"></path>
      <path d="M18.36 18.36 19.78 19.78"></path>
      <path d="M1 12 3 12"></path>
      <path d="M21 12 23 12"></path>
      <path d="M4.22 19.78 5.64 18.36"></path>
      <path d="M18.36 5.64 19.78 4.22"></path>
    </svg>
  );
}
