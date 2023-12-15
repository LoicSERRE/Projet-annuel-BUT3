import { ZonesDAO } from './ZonesDAO.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import zonesModel from '../Model/zonesModel.js';

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
     */
    async getZones(filters) {
        throw new Error('Not implemented');
    }

    /**
     * Create a new zone in the database
     * @param {object} zone - The zone to create
     */
    async createZone(zone) {
        throw new Error('Not implemented');
    }

    /**
     * Update a zone in the database
     * @param {number} zoneId - The id of the zone to update
     * @param {object} zone - The zone data to update
     */
    async updateZone(zoneId, zone) {
        throw new Error('Not implemented');
    }

    /**
     * Delete a zone in the database
     * @param {number} zoneId - The id of the zone to delete
     */
    async deleteZone(zoneId) {
        throw new Error('Not implemented');
    }
}