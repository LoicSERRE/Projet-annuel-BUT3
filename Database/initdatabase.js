import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * Method for creating the initial database
 * @function createDatabase
 * @returns {Promise<void>}
 */
async function createDatabase() {
    const db = await open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });

    
}