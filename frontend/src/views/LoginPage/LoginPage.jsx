import '../LoginPage/LoginPage.css';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/inicio');
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
          <Button className="LoginBoton" variant="outlined" onClick={handleLogin}>
            Iniciar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginPage;
