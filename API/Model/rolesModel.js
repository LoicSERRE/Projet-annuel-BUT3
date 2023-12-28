/**
 * Class rolesModel who represent a role in the database
 * @class RolesModel
 * @property {number} role_id - The id of the role
 * @property {string} name - The name of the role
 */
export default class rolesModel {
    constructor({role_id, name}) {
        this.role_id = role_id;
        this.name = name;
    }
}