import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Films from "./pages/Films";
import Series from "./pages/Series";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <div>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.95) contrast(1.15) saturate(1.2) blur(3px)",
        zIndex: -1
      }}></div>

      <Router>
        <nav className="navbar">
          <h2 className="logo">DOSTLAR HANESİ</h2>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">☰</label>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/films">Films</Link></li>
            <li><Link to="/series">Series</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
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
