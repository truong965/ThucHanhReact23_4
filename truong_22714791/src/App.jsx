import React,{ useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Sách 1', author: 'Tác giả A', genre: 'Khoa học', year: '2020' },
    { id: 2, title: 'Sách 2', author: 'Tác giả B', genre: 'Văn học', year: '2019' },
    { id: 3, title: 'Sách 3', author: 'Tác giả C', genre: 'Kinh tế', year: '2021' },
  ]);

  return (
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
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b">{book.genre}</td>
                <td className="py-2 px-4 border-b">{book.year}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;