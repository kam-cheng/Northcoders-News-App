import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopics } from "../utils/api";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmailIcon from "@mui/icons-material/Email";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// set width of side drawer
const drawerWidth = 240;

export default function NavBar(props) {
  // navigate to different links
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  //fetch topics list
  const getTopics = async () => {
    const topics = await fetchTopics();
    setTopics(topics);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  //run function on mount only
  useEffect(() => {
    getTopics();
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem
          disablePadding
          button
          key={"Home"}
          onClick={() => {
            handleDrawerToggle();
            navigate("/");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding button key={"Topics"} onClick={handleClick}>
          <ListItemButton>
            <ListItemIcon>
              <TopicOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Topics" />
          </ListItemButton>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {topics.map(({ slug }) => {
            return (
              <ListItem
                disablePadding
                button
                key={slug}
                onClick={() => {
                  handleDrawerToggle();
                  navigate(`topics/${slug}`);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SubjectOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={slug} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </Collapse>
        <ListItem
          disablePadding
          button
          key={"Post"}
          onClick={() => {
            handleDrawerToggle();
            navigate("/articles/submit");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Post Article" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <header>
      <nav>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
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
              <Typography variant="h6" noWrap component="div">
                NC News
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
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
              {drawer}
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
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
          </Box>
        </Box>
      </nav>
    </header>
  );
}
