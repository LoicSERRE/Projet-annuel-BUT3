import permissions from "./PermissionsParam.js";

/**
 * Checks if a user has the required permissions for a given path and method.
 * @param {Array<string>} userRoles - The roles of the user.
 * @param {string} path - The path to check permissions for.
 * @param {string} method - The HTTP method to check permissions for.
 * @returns {boolean} - True if the user has the required permissions, false otherwise.
 */
function hasRequiredPermissions(userRole, path, method) {
    // If the user is an admin, they have all permissions
    if (userRole === 'admin') {
        return true;
    }

    // Verify if the user's role exists in the permissions
    if (!permissions[userRole]) {
        return false;
    }

    // If the path doesn't exist for the user's role, they don't have permission
    if (!permissions[userRole][path]) {
        return false;
    }

    // If the method doesn't exist for the user's role path, they don't have permission
    if (!permissions[userRole][path][method]) {
        return false;
    }
    
    return true;
}

export default hasRequiredPermissions;