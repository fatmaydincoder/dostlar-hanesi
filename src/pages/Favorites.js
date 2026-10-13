import { useState, useEffect } from "react";

function Favorites() {
  // LocalStorage'dan verileri yükle
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [newFav, setNewFav] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Favoriler değiştikçe LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Ekleme
  const addFavorite = () => {
    if (!newFav.trim()) return;
    setFavorites([...favorites, { title: newFav, userName: "Fatma" }]);
    setNewFav("");
  };

  // Güncelleme
  const updateFavorite = (index) => {
    if (!editValue.trim()) return;
    const updated = favorites.map((fav, i) =>
      i === index ? { ...fav, title: editValue } : fav
    );
    setFavorites(updated);
    setEditIndex(null);
    setEditValue("");
  };

  // Silme
  const removeFavorite = (index) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
  };

  return (
    <div className="page">
      <div className="home-box">
        <h1>Favoriler</h1>

        {/* Yeni favori ekleme */}
        <input
          type="text"
          value={newFav}
          onChange={(e) => setNewFav(e.target.value)}
          placeholder="Yeni favori ekle"
        />
        <button onClick={addFavorite}>Ekle</button>

        {/* Listeleme */}
        {favorites.length === 0 ? (
          <p>Henüz favori eklenmedi.</p>
        ) : (
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>
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
                    <strong>{fav.title}</strong>
                    <em> (Ekleyen: {fav.userName})</em>
                    <button onClick={() => {
                      setEditIndex(index);
                      setEditValue(fav.title);
                    }}>Güncelle</button>
                    <button onClick={() => removeFavorite(index)}>Sil</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Favorites;
