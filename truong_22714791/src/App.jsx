import React,{ useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(
    // title: '',
    // author: '',
    // genre: '',
    // year: ''
    { id: 1, title: 'Sách 1', author: 'Tác giả A', genre: 'Khoa học', year: '2020' },
    { id: 2, title: 'Sách 2', author: 'Tác giả B', genre: 'Văn học', year: '2019' },
    { id: 3, title: 'Sách 3', author: 'Tác giả C', genre: 'Kinh tế', year: '2021' },
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  useEffect(() => {
    // const savedBooks = localStorage.getItem('books');
    // if (savedBooks) {
    //   setBooks(JSON.parse(savedBooks));
    // } else {
    //   setBooks([
    //     { id: 1, title: 'Sách 1', author: 'Tác giả A', genre: 'Khoa học', year: '2020' },
    //     { id: 2, title: 'Sách 2', author: 'Tác giả B', genre: 'Văn học', year: '2019' },
    //     { id: 3, title: 'Sách 3', author: 'Tác giả C', genre: 'Kinh tế', year: '2021' },
    //   ]);
    // }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  const addBook = () => {
    // if (newBook.title && newBook.author && newBook.genre && newBook.year) {
    //   const book = {
    //     id: Date.now(),
    //     ...newBook
    //   };
    //   const updatedBooks = [...books, book];
    //   setBooks(updatedBooks);
    //   localStorage.setItem('books', JSON.stringify(updatedBooks));
    //   setNewBook({
    //     title: '',
    //     author: '',
    //     genre: '',
    //     year: ''
    //   });
    // }
  };
  const deleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };
  // const filteredBooks = books.filter(book => {
  //   const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //                        book.author.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesGenre = selectedGenre === 'Tất cả' || book.genre === selectedGenre;
  //   return matchesSearch && matchesGenre;
  // });
  const filteredBooks= books;
  const genres = ['Tất cả', ...new Set(books.map(book => book.genre))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quản lý Sách</h1>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Thêm sách mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Tên sách</label>
            <input
              type="text"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Tác giả</label>
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Thể loại</label>
            <input
              type="text"
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Năm xuất bản</label>
            <input
              type="text"
              name="year"
              value={newBook.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={addBook}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm sách
        </button>
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
      {/* Bảng hiển thị sách như trước */}
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quản lý Sách</h1>
      
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
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{book.title}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.genre}</td>
                  <td className="py-2 px-4 border-b">{book.year}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
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
    </div>
  );
}

export default App;