GRANT ALL PRIVILEGES ON `test-database`.* TO 'user1'@'%';

CREATE TABLE Users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

