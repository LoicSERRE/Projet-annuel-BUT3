/**
 * Class ZoneModel who represent a zone in the map
 * @class
 * @property {number} x - The x position of the zone
 * @property {number} y - The y position of the zone
 * @property {number} width - The width of the zone
 * @property {number} height - The height of the zone
 * @property {number} nbline - The number of line in the zone
 * @property {number} nbcolumn - The number of column in the zone
 * @property {string} name - The name of the zone
 */
export default class ZoneModel {
    constructor({x, y, width, height, nbline, nbcolumn, name}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.nbline = nbline;
        this.nbcolumn = nbcolumn;
        this.name = name;
    }
}