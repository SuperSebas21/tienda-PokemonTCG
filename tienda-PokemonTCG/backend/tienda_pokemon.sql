
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

SET SQL_SAFE_UPDATES = 0;

-- Cambiamos el "Sobre 151" por la carta real de Mew ex de esa misma expansión
UPDATE productos 
SET nombre = 'Mew ex', 
    categoria = 'Cartas',
    imagen = 'https://images.pokemontcg.io/sv3pt5/151_hires.png',
    descripcion = 'Carta ultra rara holográfica de Mew ex de la expansión 151.'
WHERE nombre = 'Sobre 151';

-- Cambiamos la "Elite Trainer Box" por la poderosa carta de Arceus VSTAR
UPDATE productos 
SET nombre = 'Arceus VSTAR', 
    categoria = 'Cartas',
    marca = 'Brilliant Stars',
    imagen = 'https://images.pokemontcg.io/swsh9/136_hires.png',
    descripcion = 'Carta dorada secreta de Arceus VSTAR.'
WHERE nombre = 'Elite Trainer Box';

SET SQL_SAFE_UPDATES = 1;


SET SQL_SAFE_UPDATES = 0;

-- Corregimos la imagen por el Arceus VSTAR real y ajustamos la descripción
UPDATE productos 
SET imagen = 'https://images.pokemontcg.io/swsh9/124_hires.png',
    descripcion = 'Carta ultra rara holográfica de Arceus VSTAR.'
WHERE nombre = 'Arceus VSTAR';

SET SQL_SAFE_UPDATES = 1;


SET SQL_SAFE_UPDATES = 0;

-- Regresamos el producto a Elite Trainer Box usando una imagen de código abierto
UPDATE productos 
SET nombre = 'Elite Trainer Box', 
    categoria = 'Accesorios',
    marca = 'Scarlet & Violet',
    imagen = 'https://images.wikidexcdn.net/mwuploads/wikidex/4/4e/latest/20230221110023/Caja_de_Entrenador_%C3%89lite_de_Escarlata_y_P%C3%BArpura.png',
    descripcion = 'Caja de Entrenador de Élite con sobres, dados y fundas protectoras.'
WHERE nombre = 'Arceus VSTAR';

SET SQL_SAFE_UPDATES = 1;

SET SQL_SAFE_UPDATES = 0;

-- Cambiamos la ETB fantasma por la carta real de Radiant Greninja
UPDATE productos 
SET nombre = 'Radiant Greninja', 
    categoria = 'Cartas',
    marca = 'Astral Radiance',
    precio = 120.00,
    imagen = 'https://images.pokemontcg.io/swsh10/46_hires.png',
    descripcion = 'Carta holográfica de Radiant Greninja. Una de las cartas más usadas en el formato competitivo actual.'
WHERE nombre = 'Elite Trainer Box';

SET SQL_SAFE_UPDATES = 1;

