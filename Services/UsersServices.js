import { DAOSqliteFactory } from "../Factory/DAOSqliteFactory.js";

const Factory = new DAOSqliteFactory();
const UsersDAO = Factory.createUsersDAO();

/**
 * Represents a service for handling users requests
 */
const UsersServices = {
    /**
     * Get users
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of users
     */
    getUsers: async (filters) => {
        return await UsersDAO.getUsers(filters);
    },

    /**
     * Update users
     * @param {number} userId - The id of the user to update
     * @param {object} user - The user data to update
     * @returns {object} - The user updated
     */
    updateUsers: async (userId, user) => {
        return await UsersDAO.updateUser(userId, user);
    },

    /**
     * Delete users
     * @param {number} userId - The id of the user to delete
     * @returns {object} - The user deleted
     */
    deleteUsers: async (userId) => {
        return await UsersDAO.deleteUser(userId);
    },

    /**
     * Create users
     * @param {object} user - The user to create
     * @returns {object} - The user created
     */
    createUsers: async (user) => {
        return await UsersDAO.createUser(user);
    },

    /**
     * Add a revoked token in database
     * @param {string} token - The token to add
     * @returns {object} - The token added
     * @async
     */
    addrevokedtoken: async (token) => {
        return await UsersDAO.addrevokedtoken(token);
    },

    /**
     * Is the token revoked
     * @param {string} token - The token to check
     * @returns {boolean} - True if the token is revoked, false otherwise
     * @async
     */
    isTokenRevoked: async (token) => {
        return await UsersDAO.isTokenRevoked(token);
    }
}

export default UsersServices;