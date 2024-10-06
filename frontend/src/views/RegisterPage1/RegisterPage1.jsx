import '../RegisterPage1/RegisterPage1.css';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage1 = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Nombres:', nombres);
    console.log('Apellidos:', apellidos);
    console.log('Número de Celular:', telefono);
    navigate('/register2');
  }; 

  return (
    <Container className="ContenedorPrincipalRegistro" maxWidth="xs">
      <Grid container direction="column" alignItems="center">
        <Typography
          variant="h5"
          className="TituloRegistro"
          fontSize="38px"
          align="center"
          gutterBottom
        >
          <b>Registro de Usuario</b>
        </Typography>
        <Typography
          variant="subtitle1"
          className="SubtituloRegistro"
          color="white"
          align="justify"
          gutterBottom
        >
          Datos Personales
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit} className="FormularioRegistro">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={12} style={{ width: '100%' }}>
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
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
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
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
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
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
            <div className="ContenedorRegistro-Boton" style={{ textAlign: 'center' }}>
              <Button className="RegistrarBoton" variant="outlined" type="submit">
                Registrar
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterPage1;
