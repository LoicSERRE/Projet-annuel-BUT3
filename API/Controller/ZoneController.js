import ZonesServices from '../Services/ZonesServices.js';

/**
 * Represents a controller for handling zones requests
 * @class ZoneController
 */
class ZoneController {
    /**
     * Get zones
     * @param {object} req - The request
     * @param {object} res - The response
     * @returns {Array} - An array of zones
     * @throws {Error} 404 - Id not found
     * @throws {Error} 404 - Name not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Id must be a number
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 200 - Get zones successful
     */
    async getZones(req, res) {
        try {
            // Vérifie que les paramètres sont valides
            if (req.query.id && isNaN(req.query.id)) {
                return res.status(400).json({ error: 'Id must be a number' });
            }

            if (req.query.name && typeof req.query.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            // Vérifie que l'id ou ne nom existe
            if (req.query.id) {
                const zone = await ZonesServices.getZones({ id: req.query.id });
                if (zone.length === 0) {
                    return res.status(404).json({ error: 'Id not found' });
                }
            }
            else if (req.query.name) {
                const zone = await ZonesServices.getZones({ name: req.query.name });
                if (zone.length === 0) {
                    return res.status(404).json({ error: 'Name not found' });
                }
            }

            const zones = await ZonesServices.getZones(req.query);
            res.json(zones);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Update zones
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 404 - Id not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 200 - Zone updated
     */
    async updateZones(req, res) {
        try {
            // Vérifie que l'id existe
            const zone = await ZonesServices.getZones({ id: req.params.id });
            if (zone.length === 0) {
                return res.status(404).json({ error: 'Id not found' });
            }

            // Vérifie que le nom est valide
            if (req.body.name && typeof req.body.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            const updatedZone = await ZonesServices.updateZones(req.params.id, req.body);
            res.json(updatedZone);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Delete zones
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 404 - Id not found
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 200 - Zone deleted
     */
    async deleteZones(req, res) {
        try {
            // Vérifie que l'id existe
            const zone = await ZonesServices.getZones({ id: req.params.id });
            if (zone.length === 0) {
                return res.status(404).json({ error: 'Id not found' });
            }

            await ZonesServices.deleteZones(req.params.id);
            res.json({ message: 'Zone deleted' });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Create zones
     * @param {object} req - The request
     * @param {object} res - The response
     * @throws {Error} 500 - Unexpected error
     * @throws {Error} 400 - Name must be a string
     * @throws {Error} 200 - Zone created
     */
    async createZones(req, res) {
        try {
            // Vérifie que le nom est valide
            if (typeof req.body.name !== 'string') {
                return res.status(400).json({ error: 'Name must be a string' });
            }

            const zone = await ZonesServices.createZones(req.body);
            res.json(zone);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new ZoneController();