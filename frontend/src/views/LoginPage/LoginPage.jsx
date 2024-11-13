// LoginPage.js
import '../LoginPage/LoginPage.css';
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import initialUsers from '../../data_json/user.json'; // archivo inicial de usuarios

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Cargar `user.json` en `localStorage` al inicio si no hay datos
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => (user.username === email || user.username === email) && user.password === password
    );

    if (user) {
      navigate('/inicio');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = () => {
    navigate('/register1');
  };

  return (
    <Container className="ContenedorPrincipalLogin" maxWidth="xs">
      <Typography variant="h5" className="TituloLogin" fontSize={"38px"}>
        <b>Sistema de Control <br /> Emociones</b>
      </Typography>
      <form onSubmit={handleSubmit} className="Formulario">
        <TextField
          className="TextField"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Usuario o Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="TextField"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="ContenedorLogin-Boton">
          <Button className="LoginBoton" variant="outlined" onClick={handleRegister}>
            Registro Usuario
          </Button>
          <Button className="LoginBoton" variant="outlined" type="submit" disabled={!email || !password}>
            Iniciar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginPage;
