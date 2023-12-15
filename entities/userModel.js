/**
 * Class userModel who represent a user in the database
 * @class
 * @property {string} username - The username of the user
 * @property {string} password - The password of the user
 * @property {number} role_id - The id of the role of the user
 */
export default class userModel {
    constructor({username, password, role_id}) {
        this.username = username;
        this.password = password;
        this.role_id = role_id;
    }
}