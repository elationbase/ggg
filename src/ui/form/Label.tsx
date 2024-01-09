type LabelProps = {
  htmlFor?: string;
  text: string;
};

export function Label({ htmlFor, text }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="font-medium text-sm">
      {text}
    </label>
  );
}
