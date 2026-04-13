const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
// El puerto donde correrá tu API
const PORT = 3000; 

// Middlewares básicos
app.use(cors()); // Permite que Angular se comunique con Node sin bloqueos [cite: 188]
app.use(express.json()); // Permite recibir datos en formato JSON desde el frontend

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Cambia esto si tu usuario de MySQL es distinto
    password: '',      // Pon aquí tu contraseña de MySQL (si usas XAMPP suele estar vacía)
    database: 'tienda_pokemon'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('✅ Conectado exitosamente a la base de datos MySQL');
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de la Tienda Pokémon TCG funcionando correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});