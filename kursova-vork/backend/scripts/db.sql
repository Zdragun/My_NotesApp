CREATE DATABASE IF NOT EXISTS tasksdb;

USE tasksdb;

CREATE TABLE IF NOT EXISTS tasks(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)

    
);

INSERT INTO tasks(title,description) VALUES
('task 1', 'Some info 1'),
('task 2', 'Some info 2');