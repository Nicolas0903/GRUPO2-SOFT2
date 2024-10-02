// Detección de rostros y emociones - NO MODIFICADO
const elVideo = document.getElementById('video')

navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)

const cargarCamera = () => {
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        stream => elVideo.srcObject = stream,
        console.error
    )
}

// Cargar Modelos
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(cargarCamera)

elVideo.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(elVideo)
    document.body.append(canvas)

    const displaySize = { width: elVideo.width, height: elVideo.height }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(elVideo)
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        resizedDetections.forEach(detection => {
            const box = detection.detection.box
            new faceapi.draw.DrawBox(box, {
                label: Math.round(detection.age) + ' años ' + detection.gender
            }).draw(canvas)
        })
    }, 1000) // Detección de rostros y emociones cada segundo
})

// ---------------- FUNCIONALIDADES ADICIONALES ----------------

// Elementos adicionales
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
let trackingData = [];
let trackingInterval;
let isTracking = false;

// Función para obtener la ubicación y emociones juntas
const obtenerUbicacionYEmocion = async () => {
    if (navigator.geolocation) {
        // Obtener la ubicación
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            
            // Obtener emociones
            const detecciones = await faceapi.detectAllFaces(elVideo)
                .withFaceLandmarks()
                .withFaceExpressions()
                .withAgeAndGender();
            
            detecciones.forEach(detection => {
                const { age, gender, expressions } = detection;
                const mainEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);

                // Guardar datos de ubicación y emociones al mismo tiempo
                trackingData.push({
                    timestamp: new Date(),
                    latitude: latitude,
                    longitude: longitude,
                    edad: Math.round(age),
                    genero: gender,
                    emocion: mainEmotion
                });
            });
        });
    }
};

// Función para exportar a CSV
const exportarCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Timestamp,Latitud,Longitud,Edad,Genero,Emocion\n";

    trackingData.forEach(data => {
        csvContent += `${data.timestamp},${data.latitude},${data.longitude},${data.edad || ''},${data.genero || ''},${data.emocion || ''}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tracking_data.csv");
    document.body.appendChild(link);
    link.click();
};

// Función para iniciar el seguimiento
const iniciarSeguimiento = () => {
    if (!isTracking) {
        isTracking = true;
        // Capturar ubicación y emoción cada 7 segundos
        trackingInterval = setInterval(obtenerUbicacionYEmocion, 7000);
    }
};

// Función para detener el seguimiento
const detenerSeguimiento = () => {
    if (isTracking) {
        clearInterval(trackingInterval);
        exportarCSV();  // Exportar CSV al finalizar
        isTracking = false;
    }
};

// Event listeners para los botones
startBtn.addEventListener('click', iniciarSeguimiento);
stopBtn.addEventListener('click', detenerSeguimiento);
