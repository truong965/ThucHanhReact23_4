import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hello, Tailwind!</h1>
        <p className="text-gray-600">Đây là một màn hình đơn giản dùng Tailwind CSS ✨</p>
        <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Bấm thử nè
        </button>
      </div>
    </div>
    </>
  )
}

export default App
