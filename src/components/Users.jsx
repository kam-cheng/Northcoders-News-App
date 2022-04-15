import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Avatar, Container, Paper, Stack, Typography } from "@mui/material";

export default function Users() {
  // get current user
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <Typography variant="h3" textAlign="center">
        Profile
      </Typography>
      <Paper elevation={3} sx={{ m: 2, p: 4 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4" color="text.secondary">
            {user.name}
          </Typography>
          <Avatar
            alt={user.name}
            src={user.avatar_url}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" color="text.secondary">
            {user.username}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
