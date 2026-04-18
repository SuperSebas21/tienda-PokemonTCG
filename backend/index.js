const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
// Render asigna un puerto automático, por eso usamos process.env.PORT
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// CONFIGURACIÓN PARA LA NUBE (Aiven + Render)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // REQUERIDO para conectar con Aiven
    }
});

db.connect((err) => {
    if (err) {
        console.error('Error al establecer conexion con MySQL:', err.message);
        return;
    }
    console.log('¡Conexión exitosa con MySQL en Aiven establecida!');
});

// =====================================================================
// MIDDLEWARES DE VALIDACIÓN
// =====================================================================

const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;
    if (!nombre || nombre.trim() === '') return res.status(400).json({ error: "El nombre es obligatorio." });
    if (precio === undefined || precio <= 0) return res.status(400).json({ error: "El precio debe ser mayor a 0." });
    if (stock === undefined || stock < 0) return res.status(400).json({ error: "El stock no puede ser negativo." });
    next();
};

const validarContacto = (req, res, next) => {
    const { nombre, correo, mensaje } = req.body;
    if (!nombre || !correo || !mensaje) return res.status(400).json({ error: "Campos obligatorios faltantes." });
    if (!correo.includes('@')) return res.status(400).json({ error: "Correo no válido." });
    next();
};

// =====================================================================
// ENDPOINTS
// =====================================================================

app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});

app.post('/productos', validarProducto, (req, res) => {
    const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
    const sql = 'INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, categoria, marca, precio, stock, imagen, descripcion], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Producto registrado exitosamente', id: result.insertId });
    });
});

app.post('/contacto', validarContacto, (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    const sql = 'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Mensaje de contacto almacenado correctamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de la tienda corriendo en el puerto: ${PORT}`);
});