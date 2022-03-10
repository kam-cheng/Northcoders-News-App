export default function ErrorComponent({ error: { status, message } }) {
  return (
    <p className="error-message">
      Error: {status} {message}
    </p>
  );
}
