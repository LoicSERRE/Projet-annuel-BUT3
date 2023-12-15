import { DAOSqliteFactory } from "../Factory/DAOSqliteFactory.js";

const Factory = new DAOSqliteFactory();
const ZonesDAO = Factory.createZonesDAO();

/**
 * Represents a service for handling zones requests
 */
const ZonesServices = {
    /**
     * Get zones
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of zones
     */
    getZones: async (filters) => {
        return await ZonesDAO.getZones(filters);
    },

    /**
     * Update zones
     * @param {number} zoneId - The id of the zone to update
     * @param {object} zone - The zone data to update
     * @returns {object} - The zone updated
     */
    updateZones: async (zoneId, zone) => {
        return await ZonesDAO.updateZone(zoneId, zone);
    },

    /**
     * Delete zones
     * @param {number} zoneId - The id of the zone to delete
     * @returns {object} - The zone deleted
     */
    deleteZones: async (zoneId) => {
        return await ZonesDAO.deleteZone(zoneId);
    },

    /**
     * Create zones
     * @param {object} zone - The zone to create
     * @returns {object} - The zone created
     */
    createZones: async (zone) => {
        return await ZonesDAO.createZone(zone);
    }
}

export default ZonesServices;