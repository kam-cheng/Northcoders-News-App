import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import SideDrawer from "./SideDrawer";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

// set width of side drawer
const drawerWidth = 240;

export default function NavBar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // opents drawer for mobile devices
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // get user so we can display avatar
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: { md: 100 },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            variant="text"
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontSize: { md: "4rem" }, fontWeight: { md: "300" } }}
            >
              NC News
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              navigate("/user");
            }}
          >
            <Avatar
              alt={user.name}
              src={user.avatar_url}
              sx={{ width: { md: 80 }, height: { md: 80 } }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="drawer items"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* Display drawer temporarily on smaller screens*/}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer
            handleDrawerToggle={handleDrawerToggle}
            handleClick={handleClick}
            open={open}
          />
        </Drawer>
        {/* Display drawer permanently on larger screens  */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideDrawer
            handleDrawerToggle={handleDrawerToggle}
            handleClick={handleClick}
            open={open}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
