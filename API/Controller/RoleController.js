import RolesServices from '../services/RolesServices.js';

/**
 * Represents a controller for handling roles requests
 * @class RoleController
 */
class RoleController {
    /**
     * Get roles
     * @param {object} req - The request
     * @param {object} res - The response
     * @returns {Array} - An array of roles
     * @throws {Error} 404 - Id not found
     * @throws {Error} 404 - Name not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Id must be a number
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 200 - Get roles successful
     */
    async getRoles(req, res) {
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
                const role = await RolesServices.getRoles({ id: req.query.id });
                if (role.length === 0) {
                    res.status(404).json({ error: 'Id not found' });
                }
            }
            else if (req.query.name) {
                const role = await RolesServices.getRoles({ name: req.query.name });
                if (role.length === 0) {
                    res.status(404).json({ error: 'Name not found' });
                }
            }

            const roles = await RolesServices.getRoles(req.query);
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Update roles
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 404 - Id not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 200 - Role updated
     */
    async updateRoles(req, res) {
        try{
            if (req.body.name && typeof req.body.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            // Vérifie que l'id existe
            const role = await RolesServices.getRoles({ id: req.params.id });
            if (role.length === 0) {
                return res.status(404).json({ error: 'Id not found' });
            }

            await RolesServices.updateRoles(req.params.id, req.body);
            res.json({ message: 'Role updated' });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Delete roles
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 404 - Id not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 200 - Role deleted
     */
    async deleteRoles(req, res) {
        try {
            // Vérifie que l'id existe
            const role = await RolesServices.getRoles({ id: req.params.id });
            if (role.length === 0) {
                return res.status(404).json({ error: 'Id not found' });
            }

            await RolesServices.deleteRoles(req.params.id);
            res.json({ message: 'Role deleted' });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Create roles
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 409 - This role already exists
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Role name must be a string
     * @throws {Error} 200 - Role created
     */
    async createRoles(req, res) {
        try {
            if (req.body.name && typeof req.body.name !== 'string') {
                throw new Error('Role name must be a string');
            }

            // Verify that the name does not already exist
            else if (req.body.name) {
                const role = await RolesServices.getRoles({ name: req.body.name });
                if (role.length > 0) {
                    return res.status(409).json({ error: 'This role already exists' });
                }
            }

            const role = await RolesServices.createRoles(req.body);
            res.json(role);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new RoleController();