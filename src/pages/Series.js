import { useState, useEffect } from "react";

function Series() {
  const [series, setSeries] = useState(() => {
    const saved = localStorage.getItem("series");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("series", JSON.stringify(series));
  }, [series]);

  const addSeries = () => {
    if (!title || !creator || !userName) return;
    const dateTime = new Date().toLocaleString("tr-TR");
    const newSeries = { title, creator, userName, comment, rating, dateTime };
    if (editIndex !== null) {
      const updated = [...series];
      updated[editIndex] = newSeries;
      setSeries(updated);
      setEditIndex(null);
    } else {
      setSeries([...series, newSeries]);
    }
    setTitle(""); setCreator(""); setUserName(""); setComment(""); setRating(0);
  };

  const editSeries = (index) => {
    setTitle(series[index].title);
    setCreator(series[index].creator);
    setUserName(series[index].userName);
    setComment(series[index].comment);
    setRating(series[index].rating);
    setEditIndex(index);
  };

  const deleteSeries = (index) => setSeries(series.filter((_, i) => i !== index));

  const addFavorite = (s) => {
    const saved = localStorage.getItem("favorites");
    const favs = saved ? JSON.parse(saved) : [];
    localStorage.setItem("favorites", JSON.stringify([...favs, s]));
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
        <h1>Diziler</h1>
        <input placeholder="Dizi adı" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Yaratıcı" value={creator} onChange={(e) => setCreator(e.target.value)} />
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

        <button onClick={addSeries}>{editIndex !== null ? "Güncelle" : "Ekle"}</button>

        <ul>
          {series.map((s, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{s.title}</strong> - {s.creator}
              <em> (Ekleyen: {s.userName})</em>
              {s.comment && <p>Yorum: {s.comment}</p>}
              <p>Puan: {"★".repeat(s.rating)}{"☆".repeat(5 - s.rating)}</p>
              <small>{s.dateTime}</small>
              <div>
                <button onClick={() => editSeries(index)}>Düzenle</button>
                <button onClick={() => deleteSeries(index)}>Sil</button>
                <button onClick={() => addFavorite(s)}>Favorilere Ekle</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Series;
