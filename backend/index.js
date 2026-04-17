const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuracion de middlewares obligatorios para el funcionamiento de la API
// CORS permite que el frontend (Angular) se comunique con el servidor sin bloqueos de seguridad
app.use(cors());
// Express.json permite que el servidor procese datos en formato JSON enviados en el cuerpo de las peticiones
app.use(express.json());

// Configuracion de la conexion con el servidor de base de datos MySQL
// Es indispensable contar con las credenciales correctas para establecer el enlace
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678', // Reemplazar con la contraseña definida en Workbench
    database: 'tienda_pokemon'
});

// Verificacion del estado de la conexion
db.connect((err) => {
    if (err) {
        console.error('Error al establecer conexion con MySQL:', err.message);
        return;
    }
    console.log('Conexion exitosa con MySQL establecida');
});

// --- ENDPOINTS PARA LA GESTION DE PRODUCTOS (CARTAS POKEMON) ---

// Endpoint GET: Recupera el listado completo de productos de la base de datos
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Endpoint GET: Recupera el detalle de un producto especifico mediante una ruta dinamica
// Requerimiento tecnico para la visualizacion detallada en el frontend
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// Endpoint POST: Permite el registro de nuevos productos en el sistema
app.post('/productos', (req, res) => {
    const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
    
    // Implementacion de middleware de validacion basica para asegurar la integridad de los datos
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ error: "Faltan datos obligatorios (Nombre, Precio o Stock)" });
    }

    const sql = 'INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, categoria, marca, precio, stock, imagen, descripcion], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Producto registrado exitosamente', id: result.insertId });
    });
});

// --- ENDPOINT PARA LA GESTION DE CONTACTO ---

// Endpoint POST: Almacena los datos enviados desde el formulario de contacto del frontend
app.post('/contacto', (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    const sql = 'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Mensaje de contacto almacenado correctamente' });
    });
});

// Inicializacion del servicio en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor de la tienda corriendo en: http://localhost:${PORT}`);
});