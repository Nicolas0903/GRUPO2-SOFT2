const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const app = express();
const port = 3000;


app.use(cors()); 
// app.use(cors({ origin: 'http://localhost:8080' }));

app.use(bodyParser.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('emotions_data.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS data_collection (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER,
                date TEXT,
                time TEXT,
                latitude REAL,
                longitude REAL,
                emotion TEXT
            )`, (err) => {
                if (err) {
                    console.error('Error al crear la tabla:', err.message);
                } else {
                    console.log('Tabla data_collection lista para almacenar datos');
                }
            });
        });
    }
});

// Obtener el próximo session_id
let currentSessionId = 0;
db.get('SELECT MAX(session_id) AS max_session_id FROM data_collection', [], (err, row) => {
    if (err) {
        console.error(err.message);
    } else {
        currentSessionId = row.max_session_id ? row.max_session_id + 1 : 1;
    }
});

// Endpoint para iniciar una nueva sesión
app.post('/api/start-session', (req, res) => {
    currentSessionId += 1;
    res.status(200).send({ session_id: currentSessionId });
});

// Endpoint para insertar datos
app.post('/api/data', (req, res) => {
    const { date, time, latitude, longitude, emotion } = req.body;
    db.run(`INSERT INTO data_collection (session_id, date, time, latitude, longitude, emotion) VALUES (?, ?, ?, ?, ?, ?)`, [currentSessionId, date, time, latitude, longitude, emotion], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).send({ id: this.lastID });
        }
    });
});

// Endpoint para obtener datos
app.get('/api/data', (req, res) => {
    db.all(`SELECT * FROM data_collection`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
