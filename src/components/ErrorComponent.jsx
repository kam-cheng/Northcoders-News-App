import { Alert, Box } from "@mui/material";

export default function ErrorComponent({ error: { status, message } }) {
  if (message) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Alert severity="error">
          Error: {status} {message}
        </Alert>
      </Box>
    );
  } else {
    return <></>;
  }
}
