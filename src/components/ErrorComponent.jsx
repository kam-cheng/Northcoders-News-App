export default function ErrorComponent({ error: { status, message } }) {
  if (message) {
    return (
      <>
        Error: {status} {message}
      </>
    );
  } else {
    return <></>;
  }
}
