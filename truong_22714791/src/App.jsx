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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quản lý Sách</h1>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Tên sách</label>
            <input
              type="text"
              name="title"
              value={editingBook ? editingBook.title : newBook.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Tác giả</label>
            <input
              type="text"
              name="author"
              value={editingBook ? editingBook.author : newBook.author}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Thể loại</label>
            <input
              type="text"
              name="genre"
              value={editingBook ? editingBook.genre : newBook.genre}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Năm xuất bản</label>
            <input
              type="text"
              name="year"
              value={editingBook ? editingBook.year : newBook.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={saveBook}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingBook ? 'Lưu thay đổi' : 'Thêm sách'}
          </button>
          {editingBook && (
            <button
              onClick={cancelEditing}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Huỷ
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tìm theo tên sách hoặc tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Lọc theo thể loại</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 text-lg font-semibold">
        Tổng số sách: {filteredBooks.length}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Tên sách</th>
              <th className="py-2 px-4 border-b">Tác giả</th>
              <th className="py-2 px-4 border-b">Thể loại</th>
              <th className="py-2 px-4 border-b">Năm</th>
              <th className="py-2 px-4 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
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
                  Không tìm thấy sách phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default App;