import express from 'express';
import RoleController from '../Controller/RoleController.js';

/**
 * Represents a path for roles
 * @class RolePath
 */
const rolePath = express.Router();

/**
 * Get roles
 * @param {object} req - The request
 */
rolePath.get('/', RoleController.getRoles);

/**
 * Create roles
 * @param {object} req - The request
 */
rolePath.post('/', RoleController.createRoles);

/**
 * Update roles
 * @param {object} req - The request
 */
rolePath.patch('/', RoleController.updateRoles);

/**
 * Delete roles
 * @param {object} req - The request
 */
rolePath.delete('/', RoleController.deleteRoles);

export default rolePath;