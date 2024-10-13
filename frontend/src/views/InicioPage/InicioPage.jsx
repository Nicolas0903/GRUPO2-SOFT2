import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './InicioPage.css';
import { Container } from '@mui/material';
import Modal from 'react-modal';

const InicioPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [emotionData, setEmotionData] = useState([]); // Estado para almacenar los datos de emociones
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del popup
    const [videoStatus, setVideoStatus] = useState("Detenido"); // Estado del video (Reproduciendo / Detenido)
    const [deteccionesRealizadas, setDeteccionesRealizadas] = useState(0); // Contador de detecciones realizadas
    const [isTracking, setIsTracking] = useState(false); // Estado para indicar si el seguimiento está activo
    const intervalIdRef = useRef(null); // Usar useRef para almacenar el ID del intervalo

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models'; 
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
        if (isTracking) return; // Evitar múltiples inicios de seguimiento

        setIsTracking(true); // Marcar el seguimiento como activo
        const video = videoRef.current;
        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, { width: video.width, height: video.height });

        video.play();
        setVideoStatus("Reproduciendo"); // Actualizar el estado del video
        setDeteccionesRealizadas(0); // Reiniciar el contador de detecciones

        const emotionResults = []; // Array para almacenar los resultados de emociones

        intervalIdRef.current = setInterval(async () => {
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

            setEmotionData([...emotionResults]); // Actualizar el estado con los nuevos datos
            setDeteccionesRealizadas(prev => prev + resizedDetections.length); // Aumentar el conteo de detecciones
        }, 100); // Intervalo de 100 ms
    };

    const detenerSeguimiento = () => {
        if (!isTracking) return; // Evitar detener si no hay un seguimiento activo

        setIsTracking(false); // Marcar el seguimiento como inactivo
        const video = videoRef.current;
        video.pause(); // Detener el video
        setVideoStatus("Detenido"); // Actualizar el estado del video

        // Detener el intervalo de detección
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null; // Limpiar el ID del intervalo
    };

    const exportToCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + ["Emocion", "Confianza"].join(",") + "\n" // Encabezados
            + emotionData.map(emotion => {
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container className="container" maxWidth="xs">
            <button className='BotonI' onClick={openModal}>Mostrar Estado del Sistema y Viajes</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Estado del Sistema y Viajes"
            >
                <h2>Estado del Sistema</h2>
                <p>Estado del Video: {videoStatus}</p>
                <p>Detecciones Realizadas: {deteccionesRealizadas}</p>
                <h2>Viajes</h2>
                <p>Aquí se mostrarán los viajes...</p>
                <button className='BotonCerrar' onClick={closeModal}>Cerrar</button>
            </Modal>

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
