import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
env.config();

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
    // check than username and password are present
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Username or password missing');
    }

    let user = [];
    try {
        // Get user from database
        user = await UsersServices.getUsers({ username: req.body.username });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    // Check if user exists
    if (UsersServices.getUsers({ username: req.body.username }).length === 0) {
        return res.status(401).send('User not found');
    }

    // Check if password is correct
    if (!bcrypt.compareSync(req.body.password, user[0].password)) {
        return res.status(401).send('Wrong password');
    }
    else {
        // Return a token and a refresh token
        const token = Jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '2h' });
        const refreshToken = Jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET_REFRESH, { expiresIn: '14d' });
        return res.status(200).json({ token: token, refreshToken: refreshToken });
    }
});

export default loginPath;