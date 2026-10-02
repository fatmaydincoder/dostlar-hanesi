import { useState, useEffect } from "react";

function Films() {
  const [films, setFilms] = useState(() => {
    const saved = localStorage.getItem("films");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("films", JSON.stringify(films));
  }, [films]);

  const addFilm = () => {
    if (!title || !director || !userName) return;
    const dateTime = new Date().toLocaleString("tr-TR");
    const newFilm = { title, director, userName, comment, rating, dateTime };
    if (editIndex !== null) {
      const updated = [...films];
      updated[editIndex] = newFilm;
      setFilms(updated);
      setEditIndex(null);
    } else {
      setFilms([...films, newFilm]);
    }
    setTitle(""); setDirector(""); setUserName(""); setComment(""); setRating(0);
  };

  const editFilm = (index) => {
    setTitle(films[index].title);
    setDirector(films[index].director);
    setUserName(films[index].userName);
    setComment(films[index].comment);
    setRating(films[index].rating);
    setEditIndex(index);
  };

  const deleteFilm = (index) => setFilms(films.filter((_, i) => i !== index));

  const addFavorite = (film) => {
    const saved = localStorage.getItem("favorites");
    const favs = saved ? JSON.parse(saved) : [];
    localStorage.setItem("favorites", JSON.stringify([...favs, film]));
  };

  const commentTemplates = [
    { text: "Çok güzeldi", emoji: "😍" },
    { text: "Koca bir saçmalıktı", emoji: "👩🏻‍🦱" },
    { text: "Beni çok duygulandırdı", emoji: "😭" },
    { text: "Çok komikti", emoji: "😂" },
    { text: "Zaman kaybıydı", emoji: "⏳" },
    { text: "Beklediğimden daha iyiydi", emoji: "✨" }
  ];

  return (
    <div className="page">
      <div className="home-box">
        <h1>Filmler</h1>
        <input placeholder="Film adı" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Yönetmen" value={director} onChange={(e) => setDirector(e.target.value)} />
        <input placeholder="Ekleyen isim soyisim" value={userName} onChange={(e) => setUserName(e.target.value)} />

        <p>Hazır yorum seç:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {commentTemplates.map((c, i) => (
            <button key={i} onClick={() => setComment(`${c.emoji} ${c.text}`)}
              style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #a67c52", backgroundColor: "#fff8e7", cursor: "pointer" }}>
              {c.emoji} {c.text}
            </button>
          ))}
        </div>

        <textarea placeholder="Kendi yorumunu yaz..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: "100%", marginTop: "10px", minHeight: "60px" }} />

        <p>Puan ver (0–5):</p>
        <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
          {[0,1,2,3,4,5].map((star) => (
            <span key={star} onClick={() => setRating(star)} style={{ cursor: "pointer", fontSize: "22px", color: rating >= star ? "#FFD700" : "#ccc" }}>★</span>
          ))}
        </div>

        <button onClick={addFilm}>{editIndex !== null ? "Güncelle" : "Ekle"}</button>

        <ul>
          {films.map((film, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{film.title}</strong> - {film.director}
              <em> (Ekleyen: {film.userName})</em>
              {film.comment && <p>Yorum: {film.comment}</p>}
              <p>Puan: {"★".repeat(film.rating)}{"☆".repeat(5 - film.rating)}</p>
              <small>{film.dateTime}</small>
              <div>
                <button onClick={() => editFilm(index)}>Düzenle</button>
                <button onClick={() => deleteFilm(index)}>Sil</button>
                <button onClick={() => addFavorite(film)}>Favorilere Ekle</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Films;
