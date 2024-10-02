import './Login.css';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container className="ContenedorPrincipal" maxWidth="xs">
      <Typography variant="h5" className="Titulo" fontSize={"38px"}>
        <b>Sistema de Control <br /> Emociones</b>
      </Typography>
      <form onSubmit={handleSubmit} className="Formulario">
        <TextField
          className="TextField"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
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
        <Button
          className="Button"
          variant="outlined"
          color="secondary"
          onClick={""}
        >
          Registro Usuario
        </Button>
        <Button
          className="Button"
          variant="outlined"
          color="secondary"
          type="submit"
        >
          Iniciar
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
