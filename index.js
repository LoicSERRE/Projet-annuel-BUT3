import createDatabase from "./Database/initdatabase.js";
import express from 'express';
import userPath from "./Path/UsersPath.js";
import zonePath from "./Path/ZonesPath.js";
import rolePath from "./Path/RolesPath.js";
import loginPath from "./Path/LoginPath.js"
import Jwt from 'jsonwebtoken';
import UsersServices from "./Services/UsersServices.js";
import env from 'dotenv';
env.config();

//createDatabase();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginPath);
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next();
    });
});
app.use('/users', userPath);
app.use('/zones', zonePath);
app.use('/roles', rolePath);
app.use('/logout', (req, res) => {
    console.log('Logout');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});