import { RolesDAO } from "./RolesDAO.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import rolesModel from "../Model/rolesModel.js";

/**
 * Class RolesSqliteDAO who represent a roles DAO with SQLite database
 * @class RolesSqliteDAO
 */
export class RolesSqliteDAO extends RolesDAO {
    /**
     * Create a new RolesSqliteDAO
     * @constructor
     */
    constructor() {
        super();

        this.db = open({
            filename: './Database/database.sqlite',
            driver: sqlite3.Database
        });
    }

    /**
     * Get roles from the database with a filter
     * @param {object} filters - The filters to apply
     */
    async getRoles(filters) {
        throw new Error('Not implemented');
    }

    /**
     * Create a new role in the database
     * @param {object} role - The role to create
     */
    async createRole(role) {
        throw new Error('Not implemented');
    }

    /**
     * Update a role in the database
     * @param {number} roleId - The id of the role to update
     * @param {object} role - The role data to update
     */
    async updateRole(roleId, role) {
        throw new Error('Not implemented');
    }

    /**
     * Delete a role in the database
     * @param {number} roleId - The id of the role to delete
     */
    async deleteRole(roleId) {
        throw new Error('Not implemented');
    }
}
