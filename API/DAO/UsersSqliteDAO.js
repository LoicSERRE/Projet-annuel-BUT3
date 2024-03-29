import { UsersDAO } from './UsersDAO.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import usersModel from '../Model/userModel.js';
import permissions from '../Path/PermissionsParam.js';

export class UsersSqliteDAO extends UsersDAO {
    /**
     * Create a new UsersSqliteDAO
     * @constructor
     */
    constructor() {
        super();

        this.db = open({
            filename: './Database/database.sqlite',
            driver: sqlite3.Database
        });
    }

    /**
     * Get users from the database with a filter
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of users
     * @throws Will throw an error if one error occursed
     */
    async getUsers(filters) {
        try {
            const _db = await this.db;
            let sql = 'SELECT * FROM users';
            let sqlparams = [];
            let filtersparam = [];
    
            if (filters) {
                if (filters.id) {
                    sqlparams.push('id = ?');
                    filtersparam.push(filters.id);
                }

                if (filters.username) {
                    sqlparams.push('username = ?');
                    filtersparam.push(filters.username);
                }

                if (filters.role_id) {
                    sqlparams.push('role_id = ?');
                    filtersparam.push(filters.role_id);
                }
    
                if (sqlparams.length > 0) {
                    sql += ' WHERE ' + sqlparams.join(' AND ');
                }
            }
    
            // return a list of users objects
            const users = await _db.all(sql, filtersparam);
            return users.map((user) => new usersModel({user_id: user.id, username: user.username, password: user.password, role_id: user.role_id}));
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Create a new user in the database
     * @param {object} user - The user to create
     * @throws Will throw an error if one error occursed
     * @returns {object} - The user created
     */
    async createUser(user) {
        try {
            const _db = await this.db;
            const sql = 'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)';
            const params = [user.username, user.password, user.role_id];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Update a user in the database
     * @param {number} userId - The id of the user to update
     * @param {object} user - The user data to update
     * @throws Will throw an error if one error occursed
     * @returns {object} - The user updated
     */
    async updateUser(userId, user) {
        try {
            const _db = await this.db;
            const sql = 'UPDATE users SET username = ?, password = ?, role_id = ? WHERE id = ?';
            const params = [user.username, user.password, user.role_id, userId];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Delete a user in the database
     * @param {number} userId - The id of the user to delete
     * @throws Will throw an error if one error occursed
     * @returns {object} - The user deleted
     */
    async deleteUser(userId) {
        try {
            const _db = await this.db;
            const sql = 'DELETE FROM users WHERE id = ?';
            const params = [userId];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Add a revoked token in database
     * @param {string} token - The token to add
     * @returns {object} - The token added
     * @async
     */
    async addrevokedtoken(token) {
        try {
            const _db = await this.db;
            const sql = 'INSERT INTO revoked_tokens (token) VALUES (?)';
            const params = [token];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Is the token revoked
     * @param {string} token - The token to check
     * @returns {boolean} - True if the token is revoked, false otherwise
     * @async
     */
    async isTokenRevoked(token) {
        try {
            const _db = await this.db;
            const sql = 'SELECT * FROM revoked_tokens WHERE token = ?';
            const params = [token];
            const result = await _db.all(sql, params);
            return result.length > 0;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Get the role of a user
     * @param {number} userId - The id of the user
     * @returns {object} - The role of the user
     * @async
     */
    async getRole(role_id) {
        try {
            // Récupère le nom du role
            const _db = await this.db;
            const sql = 'SELECT name FROM roles WHERE id = ?';
            const params = [role_id];
            const result = await _db.all(sql, params);
            return result.map((role) => role.name);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Get the permissions of a user
     * @param {number} userId - The id of the user
     * @returns {object} - The permissions of the user
     * @async
     */
    async getPermissions(userId) {
        try {
            // Get user from database
            const _db = await this.db;
            const sql = 'SELECT * FROM users WHERE id = ?';
            const params = [userId];
            const result = await _db.all(sql, params);
            const role_id = result[0].role_id;

            // Get the role name
            const sql2 = 'SELECT name FROM roles WHERE id = ?';
            const params2 = [role_id];
            const result2 = await _db.all(sql2, params2);
            const role = result2[0].name;

            return permissions[role];
        }
        catch (error) {
            throw error;
        }
    }
}