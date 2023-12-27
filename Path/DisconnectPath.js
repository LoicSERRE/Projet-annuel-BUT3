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
    const token = req.headers['authorization'];

    // Check the token
    Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        await UsersServices.addrevokedtoken(token);

        return res.status(200).json({ message: 'Disconnected' });
    });
});

export default disconnectPath;