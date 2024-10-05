import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './views/ErrorPage/ErrorPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage1 from './views/RegisterPage1/RegisterPage1'; 
import RegisterPage2 from './views/RegisterPage2/RegisterPage2';
import InicioPage from './views/InicioPage/InicioPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register1" element={<RegisterPage1 />} />
        <Route path="/register2" element={<RegisterPage2 />} />
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;

