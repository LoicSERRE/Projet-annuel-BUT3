import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * Method for creating the initial database
 * @function createDatabase
 * @returns {Promise<void>}
 */
export default async function createDatabase() {
    
    // Open the database
    const db = await open({
        filename: "./Database/database.sqlite",
        driver: sqlite3.Database,
    });

    // Create the table that represents a zone with several locations
    await db.exec(`
        CREATE TABLE IF NOT EXISTS zones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            x INTEGER NOT NULL,
            y INTEGER NOT NULL,
            width INTEGER NOT NULL,
            height INTEGER NOT NULL,
            nbline INTEGER NOT NULL,
            nbcolumn INTEGER NOT NULL,
            name TEXT NOT NULL
        );
    `);

    // Create the table that represents the different roles of users
    await db.exec(`
        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

    // Create the table that represents the users
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            role_id INTEGER,
            FOREIGN KEY (role_id) REFERENCES roles (id)
        );
    `);

    // Add some zones for the beginning
    await db.exec(`
        INSERT INTO zones (x, y, width, height, nbline, nbcolumn, name) SELECT 0, 0, 100, 200, 10, 15, 'zone1' WHERE NOT EXISTS (SELECT * FROM zones WHERE name = 'zone1');
        INSERT INTO zones (x, y, width, height, nbline, nbcolumn, name) SELECT 200, 200, 10, 10, 10, 10, 'zone2' WHERE NOT EXISTS (SELECT * FROM zones WHERE name = 'zone2');
    `);

    // Add the main roles
    await db.exec(`
        INSERT INTO roles (name) SELECT 'user' WHERE NOT EXISTS (SELECT * FROM roles WHERE name = 'user');
        INSERT INTO roles (name) SELECT 'admin' WHERE NOT EXISTS (SELECT * FROM roles WHERE name = 'admin');
        INSERT INTO roles (name) SELECT 'guest' WHERE NOT EXISTS (SELECT * FROM roles WHERE name = 'guest');
    `);

    // Add some test users
    await db.exec(`
        INSERT INTO users (username, password, role_id) SELECT 'admin', 'admin', (SELECT id FROM roles WHERE name = 'admin') WHERE NOT EXISTS (SELECT * FROM users WHERE username = 'admin');
        INSERT INTO users (username, password, role_id) SELECT 'guest', 'guest', (SELECT id FROM roles WHERE name = 'guest') WHERE NOT EXISTS (SELECT * FROM users WHERE username = 'guest');
        INSERT INTO users (username, password, role_id) SELECT 'user', 'user', (SELECT id FROM roles WHERE name = 'user') WHERE NOT EXISTS (SELECT * FROM users WHERE username = 'user');
    `);
}

