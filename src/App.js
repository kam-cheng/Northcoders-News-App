import "./App.css";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import ArticleItem from "./components/ArticleItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/User";
import PostArticle from "./components/PostArticle";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/";
import Users from "./components/Users";
import defaultTheme from "./themes/defaultTheme";

function App() {
  const [user, setUser] = useState({
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={defaultTheme}>
          <NavBar>
            <Box sx={{ minHeight: "85vh", pt: { md: 10 } }}>
              <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route path="/user" element={<Users />} />
                <Route path="/topics/:topic" element={<ArticleList />} />
                <Route path="/articles/:article_id" element={<ArticleItem />} />
                <Route path="/articles/submit" element={<PostArticle />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Box>
            <Footer />
          </NavBar>
        </ThemeProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
