import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import ArticleItem from "./components/ArticleItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/topics/:topic" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticleItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
