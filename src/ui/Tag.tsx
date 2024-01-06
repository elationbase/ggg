const colorFilterMapping = new Map<string, string>();
const colorPallete = [
  'dark:bg-blue-800 dark:text-blue-200 bg-blue-200 text-blue-800',
  'dark:bg-green-800 dark:text-green-200 bg-green-200 text-green-800',
  'dark:bg-yellow-800 dark:text-yellow-200 bg-yellow-200 text-yellow-800',
  'dark:bg-indigo-800 dark:text-indigo-200 bg-indigo-200 text-indigo-800',
  'dark:bg-purple-800 dark:text-purple-200 bg-purple-200 text-purple-800',
];

export function Tag({ text }: { text: string }) {
  if (!colorFilterMapping.has(text)) {
    colorFilterMapping.set(text, colorPallete[colorFilterMapping.size % colorPallete.length]);
  }
  return (
    <span
      className={`text-xs px-2 py-0.5 font-semibold rounded uppercase inline-block ${colorFilterMapping.get(
        text,
      )}`}>
      {text}
    </span>
  );
}
