import UsersServices from '../Services/UsersServices.js';

/**
 * Represents a controller for handling users requests
 * @class UserController
 */
class UserController {
    /**
     * Get users
     * @param {object} req - The request
     * @param {object} res - The response
     * @returns {Array} - An array of users
     * @throws {Error} 404 - Id not found
     * @throws {Error} 404 - Name not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Id must be a number
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 200 - Get users successful
     */
    async getUsers(req, res) {
        try {
            // Vérifie que les paramètres sont valides
            if (req.query.id && isNaN(req.query.id)) {
                return res.status(400).json({ error: 'Id must be a number' });
            }

            if (req.query.name && typeof req.query.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            // Vérifie que l'id ou ne nom existe
            if (req.query.id) {
                const user = await UsersServices.getUsers({ id: req.query.id });
                if (user.length === 0) {
                    res.status(404).json({ error: 'Id not found' });
                }
            }
            else if (req.query.name) {
                const user = await UsersServices.getUsers({ name: req.query.name });
                if (user.length === 0) {
                    res.status(404).json({ error: 'Name not found' });
                }
            }

            const users = await UsersServices.getUsers(req.query);
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Update users
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 404 - Id not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 200 - User updated
     */
    async updateUsers(req, res) {
        try {
            // Vérifie que l'id existe
            const user = await UsersServices.getUsers({ id: req.params.id });
            if (user.length === 0) {
                return res.status(404).json({ error: 'Id not found' });
            }

            // Vérifie que le nom est valide
            if (req.body.name && typeof req.body.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            // Vérifie que le rôle existe
            if (req.body.role_id) {
                const role = await UsersServices.getUsers({ id: req.body.role_id });
                if (role.length === 0) {
                    return res.status(404).json({ error: 'Role not found' });
                }
            }

            const updatedUser = await UsersServices.updateUsers(req.params.id, req.body);
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Delete users
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 404 - Id not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 200 - User deleted
     */
    async deleteUsers(req, res) {
        try {
            // Vérifie que l'id existe
            const user = await UsersServices.getUsers({ id: req.params.id });
            if (user.length === 0) {
                return res.status(404).json({ error: 'Id not found' });
            }

            await UsersServices.deleteUsers(req.params.id);
            res.json({ message: 'User deleted' });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Create users
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 404 - Role not found
     * @throws {Error} 200 - User created
     */
    async createUsers(req, res) {
        try {
            // Vérifie que le nom est valide
            if (req.body.name && typeof req.body.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            // Vérifie que l'username de l'utilisateur n'existe pas
            if (req.body.username) {
                const user = await UsersServices.getUsers({ username: req.body.username });
                if (user.length > 0) {
                    return res.status(400).json({ error: 'Username already exist' });
                }
            }

            const user = await UsersServices.createUsers(req.body);
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new UserController();