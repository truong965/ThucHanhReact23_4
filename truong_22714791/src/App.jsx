import React,{ useState, useEffect } from 'react';
import BookItem from './components/BookItem';
function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: ''}
  );
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
   useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else { setBooks([
        { id: 1, title: 'Sách 1', author: 'Tác giả A', genre: 'Khoa học', year: '2020' },
        { id: 2, title: 'Sách 2', author: 'Tác giả B', genre: 'Văn học', year: '2019' },
        { id: 3, title: 'Sách 3', author: 'Tác giả C', genre: 'Kinh tế', year: '2021' },
      ]);}
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingBook) {
      setEditingBook({
        ...editingBook,
        [name]: value
      });
    } else {
      setNewBook({
        ...newBook,
        [name]: value
      });
    }
  };

  const saveBook = () => {
    if (editingBook) {
      const updatedBooks = books.map(book => 
        book.id === editingBook.id ? editingBook : book
      );
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setEditingBook(null);
    } else {
      if (newBook.title && newBook.author && newBook.genre && newBook.year) {
        const book = {
          id: Date.now(),
          ...newBook
        };
        const updatedBooks = [...books, book];
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setNewBook({
          title: '',
          author: '',
          genre: '',
          year: ''
        });
      }
    }
  };
  const deleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const startEditing = (book) => {
    setEditingBook(book);
  };

  const cancelEditing = () => {
    setEditingBook(null);
  };
  const genres = ['Tất cả', ...new Set(books.map(book => book.genre))];
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'Tất cả' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });
  return (
<div className="container mx-auto px-6 py-10 rounded-xl shadow-md" style={{ backgroundImage: `url(./assets/bg.jpg)`, backgroundSize: 'cover', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
  <div className="bg-white bg-opacity-80 rounded-lg p-8">
    <h1 className="text-4xl font-extrabold text-indigo-800 text-center mb-10">
      📚 Quản lý Thư viện Sách 📚
    </h1>
    <div className="mb-10 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {editingBook ? '✏️ Chỉnh sửa thông tin sách' : '➕ Thêm một cuốn sách mới'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Tên sách
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editingBook ? editingBook.title : newBook.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
            Tác giả
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={editingBook ? editingBook.author : newBook.author}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
            Thể loại
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={editingBook ? editingBook.genre : newBook.genre}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
            Năm xuất bản
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={editingBook ? editingBook.year : newBook.year}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="space-x-3">
        <button
          onClick={saveBook}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingBook ? '💾 Lưu thay đổi' : '➕ Thêm sách'}
        </button>
        {editingBook && (
          <button
            onClick={cancelEditing}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            🚫 Huỷ
          </button>
        )}
      </div>
    </div>
    <div className="mb-8 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
          🔍 Tìm kiếm sách
        </label>
        <input
          type="text"
          id="search"
          placeholder="Tìm theo tên sách hoặc tác giả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="filterGenre" className="block text-gray-700 text-sm font-bold mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a7.5 7.5 0 10-15 0m15 0a7.5 7.5 0 10-15 0M8.25 6h7.5M8.25 9h9.75m-9.75 0a7.5 7.5 0 10-15 0m15 0a7.5 7.5 0 10-15 0M12 3v1.5m0 9v1.5m-3-6h1.5m6-6h1.5m-3 6H12" />
          </svg>
          Lọc theo thể loại
        </label>
        <select
          id="filterGenre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="mb-6 text-lg font-semibold text-gray-800">
      📚 Tổng số sách: <span className="font-bold text-indigo-600">{filteredBooks.length}</span>
    </div>

    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              📖 Tên sách
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ✍️ Tác giả
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              📚 Thể loại
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              🗓️ Năm
            </th>
            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              🛠️ Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onDelete={deleteBook}
                onEdit={startEditing}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Không tìm thấy sách phù hợp 😞
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default App;