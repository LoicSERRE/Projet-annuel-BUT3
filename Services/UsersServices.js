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
    }
}

export default UsersServices;