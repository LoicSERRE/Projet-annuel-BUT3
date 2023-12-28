import { ZonesDAO } from './ZonesDAO.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import zonesModel from '../Model/zoneModel.js';

export class ZonesSqliteDAO extends ZonesDAO {
    /**
     * Create a new ZonesSqliteDAO
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
     * Get zones from the database with a filter
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of zones
     * @throws Will throw an error if one error occursed
     */
    async getZones(filters) {
        try {
            const _db = await this.db;
            let sql = 'SELECT * FROM zones';
            let sqlparams = [];
            let filtersparam = [];

            if (filters) {
                if (filters.id) {
                    sqlparams.push('id = ?');
                    filtersparam.push(filters.id);
                }

                if (filters.x) {
                    sqlparams.push('x = ?');
                    filtersparam.push(filters.x);
                }

                if (filters.y) {
                    sqlparams.push('y = ?');
                    filtersparam.push(filters.y);
                }

                if (filters.width) {
                    sqlparams.push('width = ?');
                    filtersparam.push(filters.width);
                }

                if (filters.height) {
                    sqlparams.push('height = ?');
                    filtersparam.push(filters.height);
                }

                if (filters.nbline) {
                    sqlparams.push('nbline = ?');
                    filtersparam.push(filters.nbline);
                }

                if (filters.nbcolumn) {
                    sqlparams.push('nbcolumn = ?');
                    filtersparam.push(filters.nbcolumn);
                }

                if (filters.name) {
                    sqlparams.push('name = ?');
                    filtersparam.push(filters.name);
                }

                if (sqlparams.length > 0) {
                    sql += ' WHERE ' + sqlparams.join(' AND ');
                }
            }

            // return a list of zones objects
            const zones = await _db.all(sql, filtersparam);
            return zones.map((zone) => new zonesModel({zone_id: zone.id, x: zone.x, y: zone.y, width: zone.width, height: zone.height, nbline: zone.nbline, nbcolumn: zone.nbcolumn, name: zone.name}));
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Create a new zone in the database
     * @param {object} zone - The zone to create
     * @throws Will throw an error if one error occursed
     * @returns {object} - The zone created
     */
    async createZone(zone) {
        try {
            const _db = await this.db;
            const sql = 'INSERT INTO zones (x, y, width, height, nbline, nbcolumn, name) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const params = [zone.x, zone.y, zone.width, zone.height, zone.nbline, zone.nbcolumn, zone.name];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Update a zone in the database
     * @param {number} zoneId - The id of the zone to update
     * @param {object} zone - The zone data to update
     * @throws Will throw an error if one error occursed
     * @returns {object} - The zone updated
     */
    async updateZone(zoneId, zone) {
        try {
            const _db = await this.db;
            const sql = 'UPDATE zones SET x = ?, y = ?, width = ?, height = ?, nbline = ?, nbcolumn = ?, name = ? WHERE id = ?';
            const params = [zone.x, zone.y, zone.width, zone.height, zone.nbline, zone.nbcolumn, zone.name, zoneId];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Delete a zone in the database
     * @param {number} zoneId - The id of the zone to delete
     * @throws Will throw an error if one error occursed
     * @returns {object} - The zone deleted
     */
    async deleteZone(zoneId) {
        try {
            const _db = await this.db;
            const sql = 'DELETE FROM zones WHERE id = ?';
            const params = [zoneId];
            return await _db.run(sql, params);
        }
        catch (error) {
            throw error;
        }
    }
}