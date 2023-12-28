import { ZonesSqliteDAO } from "../DAO/ZonesSqliteDAO.js";
import { expect } from "chai";

describe('ZonesSqliteDAO', () => {
    let zonesSqliteDAO;
    let idtestzone;
    
    beforeEach(() => {
        zonesSqliteDAO = new ZonesSqliteDAO();
    });

    describe('createZone', () => {
        it('should create a new zone', async () => {
            const zone = {  x: 0,
                            y: 0,
                            width: 100,
                            height: 100,
                            nbline: 10,
                            nbcolumn: 10,
                            name: 'test'};

            const newZone = await zonesSqliteDAO.createZone(zone);
            idtestzone = newZone.lastID;

            expect(newZone).to.be.an('object');
            expect(newZone).to.have.property('lastID');
        });
    });

    describe('getZones', () => {
        it('should retrieve zones based on the specified filters', async () => {
            const filters = {  id: idtestzone,
                                x: 0,
                                y: 0,
                                width: 100,
                                height: 100,
                                nbline: 10,
                                nbcolumn: 10,
                                name: 'test' };

            const zones = await zonesSqliteDAO.getZones(filters);

            expect(zones).to.be.an('array');
            expect(zones).to.have.lengthOf(1);
            expect(zones[0]).to.have.property('zone_id', idtestzone);
            expect(zones[0]).to.have.property('x', 0);
            expect(zones[0]).to.have.property('y', 0);
            expect(zones[0]).to.have.property('width', 100);
            expect(zones[0]).to.have.property('height', 100);
            expect(zones[0]).to.have.property('nbline', 10);
            expect(zones[0]).to.have.property('nbcolumn', 10);
            expect(zones[0]).to.have.property('name', 'test');
        });
    });

    describe('updateZone', () => {
        it('should update a zone', async () => {
            const zone = { x: 0,
                            y: 0,
                            width: 100,
                            height: 100,
                            nbline: 10,
                            nbcolumn: 10,
                            name: 'test2' };

            const updatedZone = await zonesSqliteDAO.updateZone(idtestzone, zone);

            expect(updatedZone).to.be.an('object');
            expect(updatedZone).to.have.property('changes');
        });
    });

    describe('deleteZone', () => {
        it('should delete a zone', async () => {
            const deletedzone = await zonesSqliteDAO.deleteZone(idtestzone);

            expect(deletedzone).to.be.an('object');
            expect(deletedzone).to.have.property('changes');
        });
    });
});