import { UsersDAO } from './UsersDAO.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import usersModel from '../Model/userModel.js';

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
     */
    async getUsers(filters) {
        throw new Error('Not implemented');
    }

    /**
     * Create a new user in the database
     * @param {object} user - The user to create
     */
    async createUser(user) {
        throw new Error('Not implemented');
    }

    /**
     * Update a user in the database
     * @param {number} userId - The id of the user to update
     * @param {object} user - The user data to update
     */
    async updateUser(userId, user) {
        throw new Error('Not implemented');
    }

    /**
     * Delete a user in the database
     * @param {number} userId - The id of the user to delete
     */
    async deleteUser(userId) {
        throw new Error('Not implemented');
    }
}