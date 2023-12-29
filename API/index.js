import createDatabase from "./Database/initdatabase.js";
import express from 'express';
import cors from 'cors'; // Import the cors middleware
import userPath from "./Path/UsersPath.js";
import zonePath from "./Path/ZonesPath.js";
import rolePath from "./Path/RolesPath.js";
import loginPath from "./Path/LoginPath.js";
import logoutPath from "./Path/DisconnectPath.js";
import refreshTokenPath from "./Path/RefreshTokenPath.js";
import Jwt from 'jsonwebtoken';
import UsersServices from "./Services/UsersServices.js";
import env from 'dotenv';
import getRequiredPermissions from "./Path/Permissions.js";
import hasRequiredPermissions from "./Path/Permissions.js";
env.config();

//createDatabase();

const app = express();
const port = 3000;

app.use(cors()); // Use the cors middleware for don't have CORS error
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginPath);
app.use('/refreshToken', refreshTokenPath);
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Regarde si le token n'est pas révoqué
    if (await UsersServices.isTokenRevoked(token)) {
        return res.status(401).json({ error: 'Token revoked' });
    }

    Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Vérifie si l'utilisateur a les permissions nécessaires
        const user = await UsersServices.getUsers({ username: decoded.username });
        
        const userRoles = await UsersServices.getRole(user[0].role_id);

        if (!hasRequiredPermissions(userRoles, req.path, req.method)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    });
});
app.use('/users', userPath);
app.use('/zones', zonePath);
app.use('/roles', rolePath);
app.use('/logout', logoutPath);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});