import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const removeFavorite = (index) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
  };

  return (
    <div className="page">
      <div className="home-box">
        <h1>Favoriler</h1>
        {favorites.length === 0 ? (
          <p>Henüz favori eklenmedi.</p>
        ) : (
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>
                <strong>{fav.title}</strong> - {fav.author || fav.director || fav.creator}
                <em> (Ekleyen: {fav.userName})</em>
                <button onClick={() => removeFavorite(index)}>Favoriden Çıkar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Favorites;
