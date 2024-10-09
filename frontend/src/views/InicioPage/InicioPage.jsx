import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './InicioPage.css'; // Asegúrate de importar el CSS
import { Container } from '@mui/material';

const InicioPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [emotionData, setEmotionData] = useState([]); // Estado para almacenar los datos de emociones
    let intervalId; // Variable para almacenar el ID del intervalo

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models'; // Ajusta la ruta a los modelos si es necesario
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL); // Carga el modelo de expresiones
            startVideo();
        };

        const startVideo = () => {
            navigator.mediaDevices.getUserMedia({ video: {} })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.error(err));
        };

        loadModels();
    }, []);

    const iniciarSeguimiento = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, { width: video.width, height: video.height });

        video.play();

        const emotionResults = []; // Array para almacenar los resultados de emociones

        intervalId = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(detections, { width: video.width, height: video.height });
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            // Guardar las emociones detectadas
            resizedDetections.forEach(detection => {
                const expressions = detection.expressions; // Obtener las expresiones
                emotionResults.push(expressions); // Agregar las emociones al array
            });

        }, 100);
    };

    const detenerSeguimiento = () => {
        const video = videoRef.current;
        video.pause(); // Detener el video
        clearInterval(intervalId); // Detener el intervalo de detección
        setEmotionData(emotionData => [...emotionData, ...emotionData]); // Agregar los datos de emociones a la lista
        exportToCSV(); // Exportar datos a CSV
    };

    const exportToCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + ["Emoción", "Confianza"].join(",") + "\n" // Encabezados
            + emotionData.map(emotion => {
                // Convertir cada emoción a CSV
                return Object.entries(emotion).map(([key, value]) => `${key}:${value}`).join(",");
            }).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "emotion_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // Simular clic en el enlace para descargar
        document.body.removeChild(link); // Limpiar el enlace del DOM
    };

    return (
        <Container className="container" maxWidth="xs">
            <div id="video-container">
                <video ref={videoRef} id="video" width="400" height="600" autoPlay muted />
                <canvas ref={canvasRef} id="overlay" />
            </div>
            <div id="controls">
                <button className='BotonI' onClick={iniciarSeguimiento}>Iniciar Seguimiento</button>
                <button className='BotonI' onClick={detenerSeguimiento}>Detener Seguimiento</button>
            </div>
        </Container>
    );
};

export default InicioPage;

