type ShowProps = {
  children: JSX.Element | string;
  fallback?: JSX.Element | string;
  when: boolean;
};

export function Show({ children, fallback, when }: ShowProps) {
  if (!when) {
    return fallback;
  }
  return children;
}
