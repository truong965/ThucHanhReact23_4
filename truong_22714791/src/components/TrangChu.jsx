import React, { useState, useEffect } from 'react';

const sampleBooks = [
  { id: 1, title: 'Dế Mèn Phiêu Lưu Ký', author: 'Tô Hoài', genre: 'Phiêu lưu', year: 1941 },
  { id: 2, title: 'Lão Hạc', author: 'Nam Cao', genre: 'Hiện thực', year: 1943 },
  { id: 3, title: 'Tuổi thơ dữ dội', author: 'Phùng Quán', genre: 'Chiến tranh', year: 1988 }
];

export default function TrangChu() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ title: '', author: '', genre: '', year: '' });

  useEffect(() => {
    const stored = localStorage.getItem('books');
    if (stored) setBooks(JSON.parse(stored));
    else setBooks(sampleBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleDelete = (id) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const handleAdd = () => {
    if (!form.title || !form.author || !form.genre || !form.year) return;
    const newBook = { ...form, id: Date.now(), year: parseInt(form.year) };
    setBooks([...books, newBook]);
    setForm({ title: '', author: '', genre: '', year: '' });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Quản lý sách 📚</h1>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc tác giả..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 p-2 rounded w-full mb-6"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input name="title" value={form.title} onChange={handleInput} placeholder="Tên sách" className="border p-2 rounded" />
        <input name="author" value={form.author} onChange={handleInput} placeholder="Tác giả" className="border p-2 rounded" />
        <input name="genre" value={form.genre} onChange={handleInput} placeholder="Thể loại" className="border p-2 rounded" />
        <input name="year" value={form.year} onChange={handleInput} placeholder="Năm" type="number" className="border p-2 rounded" />
      </div>

      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
        Thêm sách
      </button>

      <table className="w-full border border-gray-300 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Tác giả</th>
            <th className="p-2 border">Thể loại</th>
            <th className="p-2 border">Năm</th>
            <th className="p-2 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">{book.genre}</td>
              <td className="p-2 border">{book.year}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {filteredBooks.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">Không tìm thấy sách nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
