import { useState, useEffect } from "react";

function Books() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    if (!title || !author || !userName) return;
    const dateTime = new Date().toLocaleString("tr-TR");
    const newBook = { title, author, userName, comment, rating, dateTime };
    if (editIndex !== null) {
      const updated = [...books];
      updated[editIndex] = newBook;
      setBooks(updated);
      setEditIndex(null);
    } else {
      setBooks([...books, newBook]);
    }
    setTitle(""); setAuthor(""); setUserName(""); setComment(""); setRating(0);
  };

  const editBook = (index) => {
    setTitle(books[index].title);
    setAuthor(books[index].author);
    setUserName(books[index].userName);
    setComment(books[index].comment);
    setRating(books[index].rating);
    setEditIndex(index);
  };

  const deleteBook = (index) => setBooks(books.filter((_, i) => i !== index));

  const addFavorite = (book) => {
    const saved = localStorage.getItem("favorites");
    const favs = saved ? JSON.parse(saved) : [];
    localStorage.setItem("favorites", JSON.stringify([...favs, book]));
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
        <h1>Kitaplar</h1>
        {/* input alanları */}
        <input placeholder="Kitap adı" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Yazar" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Ekleyen isim soyisim" value={userName} onChange={(e) => setUserName(e.target.value)} />

        {/* hazır yorum butonları */}
        <p>Hazır yorum seç:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {commentTemplates.map((c, i) => (
            <button key={i} onClick={() => setComment(`${c.emoji} ${c.text}`)}
              style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #a67c52", backgroundColor: "#fff8e7", cursor: "pointer" }}>
              {c.emoji} {c.text}
            </button>
          ))}
        </div>

        {/* yorum alanı */}
        <textarea placeholder="Kendi yorumunu yaz..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: "100%", marginTop: "10px", minHeight: "60px" }} />

        {/* puanlama */}
        <p>Puan ver (0–5):</p>
        <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
          {[0,1,2,3,4,5].map((star) => (
            <span key={star} onClick={() => setRating(star)} style={{ cursor: "pointer", fontSize: "22px", color: rating >= star ? "#FFD700" : "#ccc" }}>★</span>
          ))}
        </div>

        <button onClick={addBook}>{editIndex !== null ? "Güncelle" : "Ekle"}</button>

        {/* listeleme */}
        <ul>
          {books.map((book, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{book.title}</strong> - {book.author}
              <em> (Ekleyen: {book.userName})</em>
              {book.comment && <p>Yorum: {book.comment}</p>}
              <p>Puan: {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}</p>
              <small>{book.dateTime}</small>
              <div>
                <button onClick={() => editBook(index)}>Düzenle</button>
                <button onClick={() => deleteBook(index)}>Sil</button>
                <button onClick={() => addFavorite(book)}>Favorilere Ekle</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Books;
