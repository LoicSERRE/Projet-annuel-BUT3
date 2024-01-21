/**
 * Class representing a users DAO
 * @class UsersDAO
 * @classdesc This class manages the persistence of users data
 */
export class UsersDAO {
    constructor() {}

    /**
     * Retrieves a user based on the specified filters
     * @param {Object} filters - The filters to apply to the search
     */
    getUsers(filters) {
        throw new Error('Not implemented');
    }

    /**
     * Create a new user in the database
     * @param {Object} user - The user to create
     */
    createUser(user) {
        throw new Error('Not implemented');
    }

    /**
     * Update a user in the database
     * @param {number} userId - The id of the user to update
     * @param {Object} user - The user data to update
     */
    updateUser(userId, user) {
        throw new Error('Not implemented');
    }

    /**
     * Delete a user in the database
     * @param {number} userId - The id of the user to delete
     */
    deleteUser(userId) {
        throw new Error('Not implemented');
    }

    /**
     * Get permissions of a user
     * @param {number}
     * @returns {Array}
     * @async
     */
    getPermissions(userId) {
        throw new Error('Not implemented');
    }
}