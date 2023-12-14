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
        CREATE TABLE IF NOT EXISTS zone (
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
}

