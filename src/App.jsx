import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Update from './components/Update/update';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter basename="/todolistnat">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}