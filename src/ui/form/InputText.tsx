type InputTextProps = JSX.IntrinsicElements['input'];

export function InputText({ type = 'text', id, ...otherProps }: InputTextProps) {
  return (
    <input
      type={type}
      id={id}
      name={id}
      {...otherProps}
      className="rounded-md py-1 px-3 border bg-zinc-50 border-zinc-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:ring-opacity-60"
    />
  );
}
