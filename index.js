import createDatabase from "./Database/initdatabase.js";
import express from 'express';
import userPath from "./Path/UsersPath.js";
import zonePath from "./Path/ZonesPath.js";
import rolePath from "./Path/RolesPath.js";
import loginPath from "./Path/LoginPath.js"
import Jwt from 'jsonwebtoken';
import UsersServices from "./Services/UsersServices.js";

//createDatabase();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userPath);
app.use('/zones', zonePath);
app.use('/roles', rolePath);
app.use('/login', loginPath);
app.use('/logout', (req, res) => {
    console.log('Logout');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});