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
     * @returns {Array} - An array of roles
     * @throws Will throw an error if one error occursed
     */
    async getRoles(filters) {
        try {
            const _db = await this.db;
            let sql = 'SELECT * FROM roles';
            let sqlparams = [];
            let filtersparam = [];
    
            if (filters) {
                if (filters.id) {
                    sqlparams.push('id = ?');
                    filtersparam.push(filters.id);
                }
    
                if (filters.name) {
                    sqlparams.push('name = ?');
                    filtersparam.push(filters.name);
                }
    
                if (sqlparams.length > 0) {
                    sql += ' WHERE ' + sqlparams.join(' AND ');
                }
            }
    
            // return a list of roles objects
            const roles = await _db.all(sql, filtersparam);
            return roles.map((role) => new rolesModel({role_id: role.id, name: role.name}));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new role in the database
     * @param {object} role - The role to create
     * @throws Will throw an error if one error occursed
     * @returns {object} - The role created
     */
    async createRole(role) {
        try {
            const _db = await this.db;
            const sql = 'INSERT INTO roles (name) VALUES (?)';
            const params = [role.name];
            await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Update a role in the database
     * @param {number} roleId - The id of the role to update
     * @param {object} role - The role data to update
     * @throws Will throw an error if one error occursed
     * @returns {object} - The role updated
     */
    async updateRole(roleId, role) {
        try {
            const _db = await this.db;
            const sql = 'UPDATE roles SET name = ? WHERE id = ?';
            const params = [role.name, roleId];
            await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Delete a role in the database
     * @param {number} roleId - The id of the role to delete
     * @throws Will throw an error if one error occursed
     * @returns {object} - The role deleted
     */
    async deleteRole(roleId) {
        try {
            const _db = await this.db;
            const sql = 'DELETE FROM roles WHERE id = ?';
            const params = [roleId];
            await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }
}
