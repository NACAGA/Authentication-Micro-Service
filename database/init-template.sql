CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phone VARCHAR(255),
    favoritecolor VARCHAR(255)
);

CREATE TABLE UserSessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    sessiontoken VARCHAR(255) NOT NULL,
    expiration DATETIME NOT NULL,
    FOREIGN KEY (userid) REFERENCES Users(id)
);
