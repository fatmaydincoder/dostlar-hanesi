import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Books from "./pages/Books";
import Films from "./pages/Films";
import Series from "./pages/Series";
import Home from "./pages/Home";
import "./index.css";
import wallpaper from "./assets/wallpaper.jpg";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
    >
      <Router>
        <nav className="navbar">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/books">Kitaplar</Link>
          <Link to="/films">Filmler</Link>
          <Link to="/series">Diziler</Link>
          <Link to="/favorites">Favoriler</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/films" element={<Films />} />
          <Route path="/series" element={<Series />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
