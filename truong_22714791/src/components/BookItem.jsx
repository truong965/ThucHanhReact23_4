
import React from "react";
const BookItem = ({ book, onDelete, onEdit }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{book.title}</td>
      <td className="py-2 px-4 border-b">{book.author}</td>
      <td className="py-2 px-4 border-b">{book.genre}</td>
      <td className="py-2 px-4 border-b">{book.year}</td>
      <td className="py-2 px-4 border-b space-x-2">
        <button
          onClick={() => onEdit(book)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
};
export default BookItem;