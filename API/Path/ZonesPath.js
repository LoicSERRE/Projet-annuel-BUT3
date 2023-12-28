import express from 'express';
import ZoneController from '../Controller/ZoneController.js';

/**
 * Represents a path for zones
 * @class ZonePath
 */
const zonePath = express.Router();

/**
 * Get zones
 * @param {object} req - The request
 */
zonePath.get('/', ZoneController.getZones);

/**
 * Create zones
 * @param {object} req - The request
 */
zonePath.post('/', ZoneController.createZones);

/**
 * Update zones
 * @param {object} req - The request
 */
zonePath.patch('/:id', ZoneController.updateZones);

/**
 * Delete zones
 * @param {object} req - The request
 */
zonePath.delete('/:id', ZoneController.deleteZones);

export default zonePath;