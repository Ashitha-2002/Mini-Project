CREATE DATABASE amc_portal;

USE amc_portal;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password)
VALUES
('admin@example.com', '$2b$10$z/9WqKzD/S0WZ5nRRmVlhZaF5zUS08O/9Z5aPzP0uFPpKaJjmbjHm'),  -- 'adminpassword'
('user@example.com', '$2b$10$bpHO82gJv2aFDgmdIeyOU2aa39GgGHj6jKVs2Uzoz80GVmcmmguvC');  -- 'userpassword'
