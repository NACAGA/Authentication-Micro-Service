CREATE TABLE UserSessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    sessiontoken VARCHAR(255) NOT NULL,
    expiration DATETIME NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);
