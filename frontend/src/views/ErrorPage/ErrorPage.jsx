import '../ErrorPage/ErrorPage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <Container className="ContenedorPrincipalError" maxWidth="xs">
            <h1 className="TituloError">¡Error 404!</h1>
            <p className="MensajeError">Lo sentimos, ha ocurrido un error.</p> <br/>
            <Container className="ContenedorError-Boton">
                <button className="BotonError" onClick={handleGoHome}>Regresar al Login</button>
            </Container>
        </Container>
    );
};

export default ErrorPage;
