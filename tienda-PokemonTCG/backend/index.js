const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuracion de los middlewares necesarios para el proyecto
// Cors permite la comunicacion entre el puerto de Angular y el de Node
app.use(cors());
// Express.json sirve para que el servidor pueda interpretar los datos que llegan en el cuerpo de las peticiones
app.use(express.json());

// Configuracion de los parametros de acceso a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Se deja vacio por defecto para entornos locales como XAMPP
    database: 'tienda_pokemon'
});

// Procedimiento para establecer y verificar la conexion con el servidor de base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        return;
    }
    console.log('Conexion exitosa con MySQL establecida');
});

// Endpoint GET: Recupera la lista completa de cartas registradas en el catalogo
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Endpoint GET: Obtiene la informacion detallada de una carta especifica usando su ID
// Este endpoint cumple con el requisito de usar rutas dinamicas
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// Endpoint POST: Permite el registro de nuevas cartas en la base de datos
app.post('/productos', (req, res) => {
    const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
    
    // Implementacion de un middleware de validacion basico para evitar campos vacios
    // Esto asegura la integridad de los datos obligatorios del producto
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ error: "Nombre, precio y stock son campos obligatorios" });
    }

    const sql = 'INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, categoria, marca, precio, stock, imagen, descripcion], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Producto registrado correctamente en el sistema', id: result.insertId });
    });
});

// Endpoint POST: Gestiona el almacenamiento de los mensajes enviados desde el formulario de contacto
app.post('/contacto', (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    const sql = 'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'El mensaje de contacto ha sido recibido y guardado' });
    });
});

// Inicio del servicio del servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor de la tienda corriendo en: http://localhost:${PORT}`);
});