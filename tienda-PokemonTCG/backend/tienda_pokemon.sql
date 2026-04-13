CREATE DATABASE IF NOT EXISTS tienda_pokemon;
USE tienda_pokemon;

-- Tabla obligatoria de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50), -- Ej: Pokémon, Energía, Trainer
    marca VARCHAR(50),     -- Ej: Scarlet & Violet, Sword & Shield
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),   -- URL de la imagen de la carta
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE
);

-- Tabla obligatoria de mensajes de contacto 
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    asunto VARCHAR(150),
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);