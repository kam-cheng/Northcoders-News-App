import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListItemText from "@mui/material/ListItemText";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import EmailIcon from "@mui/icons-material/Email";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function SideDrawer({ handleDrawerToggle, handleClick, open }) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  //fetch topics list
  const getTopics = async () => {
    const topics = await fetchTopics();
    setTopics(topics);
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
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
                  <ListItemText
                    sx={{ textTransform: "capitalize" }}
                    primary={slug}
                  />
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
}
