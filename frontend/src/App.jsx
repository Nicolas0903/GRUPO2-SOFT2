import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './views/ErrorPage/ErrorPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage'; 
import InicioPage from './views/InicioPage/InicioPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/inicio" element={<InicioPage />} />
      </Routes>
    </Router>
  );
};

export default App;

