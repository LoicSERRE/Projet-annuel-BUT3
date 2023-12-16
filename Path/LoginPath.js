import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';
import bcrypt from 'bcrypt';

/**
 * Represents a path for login
 * @class LoginPath
 */
const loginPath = express.Router();

/**
 * Login
 * @param {object} req - The request
 */
loginPath.post('/', async (req, res) => {
    console.log('Login');
});

export default loginPath;