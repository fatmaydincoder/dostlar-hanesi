import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [newFav, setNewFav] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    if (!newFav.trim()) return;
    setFavorites([...favorites, { title: newFav }]);
    setNewFav("");
  };

  const updateFavorite = (index) => {
    if (!editValue.trim()) return;
    const updated = favorites.map((fav, i) =>
      i === index ? { ...fav, title: editValue } : fav
    );
    setFavorites(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const deleteFavorite = (index) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
  };

  return (
    <div className="page">
      <div className="home-box">
        <h1>Favoriler</h1>
        <input
          type="text"
          value={newFav}
          onChange={(e) => setNewFav(e.target.value)}
          placeholder="Yeni favori ekle"
        />
        <button onClick={addFavorite}>Ekle</button>

        {favorites.length === 0 ? (
          <p>Henüz favori eklenmedi.</p>
        ) : (
          favorites.map((fav, index) => (
            <div key={index} className="favorite-card">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => updateFavorite(index)}>Kaydet</button>
                  <button onClick={() => setEditIndex(null)}>İptal</button>
                </>
              ) : (
                <>
                  <h3>{fav.title}</h3>
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditValue(fav.title);
                    }}
                  >
                    Güncelle
                  </button>
                  <button onClick={() => deleteFavorite(index)}>Sil</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
