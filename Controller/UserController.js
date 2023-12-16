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
     */
    async getUsers(req, res) {
        throw new Error('Not implemented');
    }

    /**
     * Update users
     * @param {object} req - The request
     * @param {object} res - The response
     */
    async updateUsers(req, res) {
        throw new Error('Not implemented');
    }

    /**
     * Delete users
     * @param {object} req - The request
     * @param {object} res - The response
     */
    async deleteUsers(req, res) {
        throw new Error('Not implemented');
    }

    /**
     * Create users
     * @param {object} req - The request
     * @param {object} res - The response
     */
    async createUsers(req, res) {
        throw new Error('Not implemented');
    }
}

export default new UserController();