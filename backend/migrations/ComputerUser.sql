CREATE DATABASE ComputerUser;

\c ComputerUser; 

CREATE TABLE Users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Computer_List (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    department TEXT,
    license TEXT,
    Installed TEXT,
    brand TEXT,
    model TEXT,
    serial TEXT
);