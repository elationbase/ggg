type ButtonProps = {
  type?: 'button' | 'submit';
  text: string | JSX.Element;
  onClick?: () => void;
  isDisabled?: boolean;
};

export function Button({ type = 'button', text, onClick, isDisabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className="border border-0.5 border-zinc-400 text-zinc-800 bg-zinc-100 font-normal transition-all px-4 py-1 rounded disabled:cursor-not-allowed">
      {text}
    </button>
  );
}
