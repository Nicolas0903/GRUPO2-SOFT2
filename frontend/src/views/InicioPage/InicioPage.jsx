import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './InicioPage.css';
import { Container } from '@mui/material';
import Modal from 'react-modal';

export const downloadFile = (content, filename) => {
    console.log(`downloadFile called with content: ${content}, filename: ${filename}`);
    const encodedUri = encodeURI(content);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToCSV = (emotionData, downloadFileFunc) => {
    const csvContent = "data:text/csv;charset=utf-8,"
        + ["Emocion,Confianza"].join(",") + "\n"
        + emotionData.map(emotion => {
            return Object.entries(emotion)
                .map(([key, value]) => `${key}:${value}`)
                .join(",");
        }).join("\n");

    downloadFileFunc(csvContent, "emotion_data.csv");
};

export const exportToJSON = (emotionData, downloadFileFunc) => {
    const jsonContent = "data:text/json;charset=utf-8,"
        + JSON.stringify(emotionData, null, 2);

    downloadFileFunc(jsonContent, "emotion_data.json");
};

export const exportToTXT = (emotionData, downloadFileFunc) => {
    const txtContent = "data:text/plain;charset=utf-8,"
        + emotionData.map(emotion => {
            return Object.entries(emotion)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n");
        }).join("\n\n");

    downloadFileFunc(txtContent, "emotion_data.txt");
};

const InicioPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [emotionData, setEmotionData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoStatus, setVideoStatus] = useState("Detenido");
    const [deteccionesRealizadas, setDeteccionesRealizadas] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("csv");
    const intervalIdRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models'; 
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
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
        if (isTracking) return;

        setIsTracking(true);
        const video = videoRef.current;
        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, { width: video.width, height: video.height });

        video.play();
        setVideoStatus("Reproduciendo");
        setDeteccionesRealizadas(0);

        const emotionResults = [];

        intervalIdRef.current = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(detections, { width: video.width, height: video.height });
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            resizedDetections.forEach(detection => {
                const expressions = detection.expressions;
                emotionResults.push(expressions);
            });

            setEmotionData([...emotionResults]);
            setDeteccionesRealizadas(prev => prev + resizedDetections.length);
        }, 100);
    };

    const detenerSeguimiento = () => {
        if (!isTracking) return;

        setIsTracking(false);
        const video = videoRef.current;
        video.pause();
        setVideoStatus("Detenido");

        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    };

    const handleDownload = () => {
        switch (selectedFormat) {
            case "csv":
                exportToCSV(emotionData, downloadFile);
                break;
            case "json":
                exportToJSON(emotionData, downloadFile);
                break;
            case "txt":
                exportToTXT(emotionData, downloadFile);
                break;
            default:
                console.error("Formato no soportado.");
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                <h2>Exportar Datos</h2>
                <div>
                    <label htmlFor="format-select">Seleccionar formato: </label>
                    <select
                        id="format-select"
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                    >
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                        <option value="txt">TXT</option>
                    </select>
                </div>
                <button className='BotonI' onClick={handleDownload}>Descargar Datos</button>
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
