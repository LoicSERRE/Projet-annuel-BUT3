import { UsersSqliteDAO } from "../DAO/UsersSqliteDAO.js";
import { expect } from "chai";

describe('UsersSqliteDAO', () => {
    let usersSqliteDAO;
    let idtestuser;

    beforeEach(() => {
        usersSqliteDAO = new UsersSqliteDAO();
    });

    describe('getUsers', () => {
        it('should retrieve users based on the specified filters', async () => {
            const filters = { id: 1,
                              username: 'admin',
                              role_id: 2 };

            const users = await usersSqliteDAO.getUsers(filters);

            expect(users).to.be.an('array');
            expect(users).to.have.lengthOf(1);
            expect(users[0]).to.have.property('user_id', 1);
            expect(users[0]).to.have.property('username', 'admin');
            expect(users[0]).to.have.property('role_id', 2);
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const user = { username: 'test',
                           password: 'test',
                           role_id: 1 };

            const newUser = await usersSqliteDAO.createUser(user);
            idtestuser = newUser.lastID;

            expect(newUser).to.be.an('object');
            expect(newUser).to.have.property('lastID');
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const user = { username: 'test2',
                           password: 'test2',
                           role_id: 2 };

            const updatedUser = await usersSqliteDAO.updateUser(idtestuser, user);

            expect(updatedUser).to.be.an('object');
            expect(updatedUser).to.have.property('changes');
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            const deleteduser = await usersSqliteDAO.deleteUser(idtestuser);

            expect(deleteduser).to.be.an('object');
            expect(deleteduser).to.have.property('changes');
        });
    });
});