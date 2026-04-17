-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tienda_pokemon;

-- 2. Seleccionar la base de datos para trabajar en ella
USE tienda_pokemon;

-- 3. Crear la tabla de productos (Requerimiento 5.1 del proyecto)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    marca VARCHAR(50),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE
);

-- 4. Crear la tabla de mensajes (Requerimiento 5.2 del proyecto)
CREATE TABLE IF NOT EXISTS mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    asunto VARCHAR(150),
    mensaje TEXT NOT NULL
);

-- 5. Insertar datos iniciales para el catalogo
INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion, disponible) 
VALUES 
('Charizard ex', 'Pokemon', 'Obsidian Flames', 450.00, 5, 'https://images.pokemontcg.io/sv3/125_hires.png', 'Carta de rareza Double Rare con ataque Tera', 1),
('Energia Fuego Holo', 'Energia', 'Scarlet & Violet', 25.00, 50, 'https://images.pokemontcg.io/sv1/230_hires.png', 'Energia basica con acabado foil', 1),
('Iono Supporter', 'Trainer', 'Paldea Evolved', 120.00, 10, 'https://images.pokemontcg.io/sv2/185_hires.png', 'Carta de partidario indispensable para el mazo actual', 1);

SELECT * FROM productos;

SELECT * FROM mensajes;