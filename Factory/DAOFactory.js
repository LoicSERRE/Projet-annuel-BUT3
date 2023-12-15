/**
 * Represents a factoru for creating DAOs objects
 * @class DAOFactory
 */
export class DAOFactory {
    constructor() {}

    /**
     * Creates a DAOFactory object
     * @returns {RolesDAO} - The roles DAO
     */
    createRolesDAO() {
        throw new Error('Not implemented');
    }

    /**
     * Creates a DAOFactory object
     * @returns {UsersDAO} - The users DAO
     */
    createUsersDAO() {
        throw new Error('Not implemented');
    }

    /**
     * Creates a DAOFactory object
     * @returns {ZonesDAO} - The zones DAO
     */
    createZonesDAO() {
        throw new Error('Not implemented');
    }
}