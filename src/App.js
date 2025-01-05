import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

function App() {
 
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
