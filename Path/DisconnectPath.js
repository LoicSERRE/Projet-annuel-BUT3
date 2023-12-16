import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';
import bcrypt from 'bcrypt';

/**
 * Represents a path for login
 * @class LoginPath
 */
const disconnectPath = express.Router();

/**
 * Disconnect
 * @param {object} req - The request
 */
disconnectPath.post('/', async (req, res) => {
    console.log('Disconnect');
});

export default disconnectPath;