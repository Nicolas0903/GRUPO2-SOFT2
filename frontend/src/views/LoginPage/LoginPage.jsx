import '../LoginPage/LoginPage.css';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import users from '../../data_json/user.json';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si el usuario y la contraseña son correctos
    const user = users.find(user => 
      (user.username === email || user.username === email) && user.password === password
    );

    if (user) {
      navigate('/inicio'); // Redirigir si la autenticación es exitosa
    } else {
      alert('Usuario o contraseña incorrectos'); // Mensaje de error
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
