import Jwt from 'jsonwebtoken';
import express from 'express';
import UsersServices from '../Services/UsersServices.js';

const router = express.Router();

router.use('/', async (req, res) => {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    Jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // get user from database
        const user = await UsersServices.getUsers({ username: decoded.username });

        // return a new token
        const token = Jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '2h' });

        return res.status(200).json({ token: token });
    });
});

export default router;