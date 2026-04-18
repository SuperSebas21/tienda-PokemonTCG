const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AH040901p', // Reemplazar con la contraseña definida en Workbench
    database: 'tienda_pokemon'
});

db.connect((err) => {
    if (err) {
        console.error('Error al establecer conexion con MySQL:', err.message);
        return;
    }
    console.log('Conexion exitosa con MySQL establecida');
});

// =====================================================================
// MIDDLEWARES DE VALIDACIÓN (Punto 7.2 de la rúbrica)
// =====================================================================

// Middleware para validar que los productos tengan datos correctos
const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;
    
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: "El nombre de la carta es obligatorio." });
    }
    if (precio === undefined || precio <= 0) {
        return res.status(400).json({ error: "El precio debe ser un número mayor a 0." });
    }
    if (stock === undefined || stock < 0) {
        return res.status(400).json({ error: "El stock no puede ser negativo." });
    }
    
    next(); // Si todo está bien, permite que la petición continúe
};

// Middleware para validar el formulario de contacto
const validarContacto = (req, res, next) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ error: "Nombre, correo y mensaje son campos obligatorios." });
    }
    if (!correo.includes('@')) {
        return res.status(400).json({ error: "El formato del correo no es válido." });
    }

    next();
};

// =====================================================================
// ENDPOINTS PARA LA GESTIÓN DE PRODUCTOS
// =====================================================================

app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// Aquí inyectamos el middleware 'validarProducto'
app.post('/productos', validarProducto, (req, res) => {
    const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
    
    const sql = 'INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, categoria, marca, precio, stock, imagen, descripcion], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Producto registrado exitosamente', id: result.insertId });
    });
});

// =====================================================================
// ENDPOINT PARA LA GESTIÓN DE CONTACTO
// =====================================================================

// Aquí inyectamos el middleware 'validarContacto'
app.post('/contacto', validarContacto, (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    const sql = 'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Mensaje de contacto almacenado correctamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de la tienda corriendo en: http://localhost:${PORT}`);
});