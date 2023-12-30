CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'BLOCKED') NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phone VARCHAR(255),
    favoritecolor VARCHAR(255)
);