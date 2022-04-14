import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ErrorPage() {
  return (
    <Box m={10}>
      <Typography variant="h5" gutterBottom>
        Oops...looks like you are at the wrong page!
      </Typography>
      <Button>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Typography variant="h5">Go Back to HomePage</Typography>
        </Link>
      </Button>
    </Box>
  );
}
