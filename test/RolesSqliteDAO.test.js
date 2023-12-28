import { RolesSqliteDAO } from "../DAO/RolesSqliteDAO.js";
import { expect } from "chai";

describe('RolesSqliteDAO', () => {
    let rolesSqliteDAO;
    let idtestrole;

    beforeEach(() => {
        rolesSqliteDAO = new RolesSqliteDAO();
    });

    describe('getRoles', () => {
        it('should retrieve roles based on the specified filters', async () => {
            const filters = { id: 1 };

            const roles = await rolesSqliteDAO.getRoles(filters);

            expect(roles).to.be.an('array');
            expect(roles).to.have.lengthOf(1);
            expect(roles[0]).to.have.property('role_id', 1);
            expect(roles[0]).to.have.property('name', 'user');
        });
    });

    describe('createRole', () => {
        it('should create a new role', async () => {
            const role = { name: 'test' };

            const newRole = await rolesSqliteDAO.createRole(role);
            idtestrole = newRole.lastID;

            expect(newRole).to.be.an('object');
            expect(newRole).to.have.property('lastID');
        });
    });

    describe('updateRole', () => {
        it('should update a role', async () => {
            const role = { name: 'test2' };

            const updatedRole = await rolesSqliteDAO.updateRole(idtestrole, role);

            expect(updatedRole).to.be.an('object');
            expect(updatedRole).to.have.property('changes');
        });
    });

    describe('deleteRole', () => {
        it('should delete a role', async () => {
            const deletedrole = await rolesSqliteDAO.deleteRole(idtestrole);

            expect(deletedrole).to.be.an('object');
            expect(deletedrole).to.have.property('changes');
        });
    });
});