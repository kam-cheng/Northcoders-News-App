export default function ErrorComponent({ error: { status, message } }) {
  if (message) {
    return (
      <p className="error-message">
        Error: {status} {message}
      </p>
    );
  } else {
    return null;
  }
}
