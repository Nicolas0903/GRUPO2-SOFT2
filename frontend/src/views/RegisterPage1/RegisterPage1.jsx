import '../RegisterPage1/RegisterPage1.css';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage1 = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Nombres:', nombres);
    console.log('Apellidos:', apellidos);
    console.log('Número de Celular:', telefono);
    // Redirigir a la página de inicio o a donde desees
    navigate('/register2');
  }; 

  return (
    <Container className="ContenedorPrincipalRegistro" maxWidth="xs">
      <Typography variant="h5" className="TituloRegistro" fontSize={"38px"}>
        <b>Registro de Usuario</b>
      </Typography>
      <Typography variant="subtitle1" className="SubtituloRegistro" color="white">
        Datos Personales
      </Typography>
      <form onSubmit={handleSubmit} className="FormularioRegistro">
        <TextField
          className="TextField"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
        <TextField
          className="TextField"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <TextField
          className="TextField"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Número de Celular"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <div className="ContenedorRegistro-Boton">
          <Button className="RegistrarBoton" variant="outlined" type="submit">
            Registrar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RegisterPage1;
