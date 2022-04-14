import { Typography, Grid, Button, Stack } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <footer>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "primary.dark",
          color: "white",
          p: 3,
          mt: 3,
        }}
      >
        <Grid item>
          <Typography variant="body1" m={1}>
            Author: Kam Cheng
          </Typography>
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Button
              href="mailto:kamcheng@hotmail.co.uk"
              startIcon={<EmailIcon fontSize="large" />}
              size="large"
              color="inherit"
            >
              Email
            </Button>
            <Button
              href="https://www.linkedin.com/in/kam-cheng/"
              startIcon={<LinkedInIcon fontSize="large" />}
              size="large"
              color="inherit"
            >
              LinkedIn
            </Button>
            <Button
              href="https://github.com/kam-cheng/"
              startIcon={<GitHubIcon fontSize="large" />}
              size="large"
              color="inherit"
            >
              Github
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </footer>
  );
}
