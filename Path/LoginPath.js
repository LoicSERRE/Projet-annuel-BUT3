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
    // Vérifie que le nom d'utilisateur et le mot de passe sont présents
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Username or password missing');
    }

    let user = [];
    try {
        // Récupère l'utilisateur
        user = await UsersServices.getUsers({ username: req.body.username });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    // Vérifie que l'utilisateur existe
    if (UsersServices.getUsers({ username: req.body.username }).length === 0) {
        return res.status(401).send('User not found');
    }

    // Vérifie que le mot de passe est correct
    if (!bcrypt.compareSync(req.body.password, user[0].password)) {
        return res.status(401).send('Wrong password');
    }
    else {
        const token = Jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return res.status(200).json({ token: token });
    }
});

export default loginPath;