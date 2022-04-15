import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ErrorPage() {
  return (
    <Box m={5}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Oops...looks like you are not meant to be here!
      </Typography>
      <Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h5">Go Back to HomePage</Typography>
        </Link>
      </Button>
    </Box>
  );
}
