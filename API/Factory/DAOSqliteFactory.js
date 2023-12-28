import { DAOFactory } from "./DAOFactory.js"
import { UsersSqliteDAO } from "../DAO/UsersSqliteDAO.js"
import { RolesSqliteDAO } from "../DAO/RolesSqliteDAO.js"
import { ZonesSqliteDAO } from "../DAO/ZonesSqliteDAO.js"

/**
 * Represents a factoru for creating Sqlite DAOs objects
 * @extends DAOFactory
 * @class DAOSqliteFactory
 */
export class DAOSqliteFactory extends DAOFactory{
    /**
     * Create a nex instance of DAOSqliteFactory
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Create a new instance of UsersSqliteDAO
     * @returns {UsersSqliteDAO} - A new instance of UsersSqliteDAO
     */
    createUsersDAO() {
        return new UsersSqliteDAO();
    }

    /**
     * Create a new instance of RolesSqliteDAO
     * @returns {RolesSqliteDAO} - A new instance of RolesSqliteDAO
     */
    createRolesDAO() {
        return new RolesSqliteDAO();
    }

    /**
     * Create a new instance of ZonesSqliteDAO
     * @returns {ZonesSqliteDAO} - A new instance of ZonesSqliteDAO
     */
    createZonesDAO() {
        return new ZonesSqliteDAO();
    }
}