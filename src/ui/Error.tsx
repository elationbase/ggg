/* This is a reusable error component */
export function Error({ message }: { message?: string[] | string }) {
  if (!message) {
    return null;
  }

  if (Array.isArray(message) && message?.length > 1) {
    return message.map((msg, index) => (
      <p key={index} className="text-red-500 text-sm -mt-1">
        {msg}
      </p>
    ));
  }

  return <p className="text-red-500 text-sm -mt-1">{message}</p>;
}
