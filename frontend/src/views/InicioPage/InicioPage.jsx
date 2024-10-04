import '../InicioPage/InicioPage.css'; 
import React, { useEffect } from 'react';
import { Container, Button, Typography } from '@mui/material';

const InicioPage = () => {
  useEffect(() => {
    // Función para cargar el script de face-api
    const loadFaceApi = () => {
      const script = document.createElement('script');
      script.src = 'face-api.min.js'; // Asegúrate de que este archivo está en la misma carpeta
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("face-api.min.js cargado correctamente");
        startCamera(); // Iniciar la cámara una vez que el script se haya cargado
      };

      script.onerror = () => {
        console.error("Error al cargar face-api.min.js");
      };
    };

    // Función para iniciar la cámara
    const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const videoElement = document.getElementById('video');
      
          // Asignar el flujo al elemento de video
          videoElement.srcObject = stream;
      
          // Asegúrate de esperar un poco antes de reproducir
          videoElement.onloadedmetadata = () => {
            videoElement.play();
          };
        } catch (error) {
          console.error('Error al acceder a la cámara: ', error);
        }
      };

    loadFaceApi();

    // Limpieza al desmontar el componente
    return () => {
      const script = document.querySelector('script[src="face-api.min.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Container className='ContenedorPrincipalInicio' maxWidth="xs" disableGutters>
        <Typography variant="h4" className='TituloInicio'>
            Reconocimiento de Emociones
        </Typography>
        <video id='video' className='Video' autoPlay muted loop />
        <Container className="ContenedorInicio-Boton">
            <Button variant="contained" className='BotonInicio'>
                Inicio
            </Button>
            <Button variant="contained" className='BotonInicio'>
                Fin
            </Button>
        </Container>
    </Container>
  );
};

export default InicioPage;
