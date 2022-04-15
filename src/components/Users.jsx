import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/User";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { fetchUsernames, fetchUser } from "../utils/api";

export default function Users() {
  // get current user
  const { user, setUser } = useContext(UserContext);
  const [usernames, setUsernames] = useState([]);

  //fetch usernames list
  const getUsernames = async () => {
    const usernamesList = await fetchUsernames();
    setUsernames(usernamesList);
  };
  useEffect(() => {
    getUsernames();
  }, []);

  const changeUser = async (username) => {
    const newUser = await fetchUser(username);
    setUser(newUser);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ m: 4 }}
    >
      <Typography variant="h3" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 4, minWidth: 300 }}>
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
          <Typography variant="subtitle2" color="text.secondary">
            {user.username}
          </Typography>
        </Stack>
      </Paper>
      <Box pt={4}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Change User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.username}
            label="Username"
            onChange={(event) => changeUser(event.target.value)}
          >
            {usernames.map(({ username }) => {
              return (
                <MenuItem value={username} key={username}>
                  {username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
