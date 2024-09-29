import './Login.css';
import React, { useState } from 'react';
import { Container, TextField, Button, CssBaseline, Typography } from '@mui/material';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);
  };

    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Sistema de Control de Emociones
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
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
            variant="outlined" 
            color="secondary" 
            style={{ marginTop: '10px' }}
            onClick={""} // Llama a la función de registro
        >
          Registro Usuario
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          style={{ marginTop: '10px' }}
          onClick={""} // Llama a la función de registro
        >
          Iniciar
        </Button>
      </form>
    </Container>
    );

};

export default LoginPage;