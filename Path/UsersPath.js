import express from 'express';
import UserController from '../Controller/UserController.js';

/**
 * Represents a path for users
 * @class UserPath
 */
const userPath = express.Router();

/**
 * Get users
 * @param {object} req - The request
 */
userPath.get('/', UserController.getUsers);

/**
 * Create users
 * @param {object} req - The request
 */
userPath.post('/', UserController.createUsers);

/**
 * Update users
 * @param {object} req - The request
 */
userPath.patch('/:id', UserController.updateUsers);

/**
 * Delete users
 * @param {object} req - The request
 */
userPath.delete('/:id', UserController.deleteUsers);

export default userPath;