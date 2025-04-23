
import React from "react";
const BookItem = ({ book, onDelete, onEdit }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="py-3 px-4 border-b border-gray-200 font-medium text-gray-800">
        {book.title}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
        {book.author}
      </td>
      <td className="py-3 px-4 border-b border-gray-200">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {book.genre}
        </span>
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">
        {book.year}
      </td>
      <td className="py-3 px-4 border-b border-gray-200 text-right">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onEdit(book)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};
export default BookItem;