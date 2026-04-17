-- Creacion de la base de datos para la tienda
CREATE DATABASE IF NOT EXISTS tienda_pokemon;
USE tienda_pokemon;

-- Tabla de productos segun los requerimientos del manual
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50), -- Ej: Cartas, Accesorios, Sobres
    marca VARCHAR(50),     -- Ej: Scarlet & Violet, Sword & Shield
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),   -- URL o ruta de la imagen
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE
);

-- Tabla para almacenar mensajes del formulario de contacto
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    asunto VARCHAR(150),
    mensaje TEXT NOT NULL
);