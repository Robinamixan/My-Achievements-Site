import * as dbConnectionHelper from './helpers/db-connection.js';
import * as authorizeUserHelper from './helpers/authorized-user.js';
import * as appServer from '../app-server.js';

const app = appServer.init();

before(async () => {
    try {
        await dbConnectionHelper.setConnection();
        await authorizeUserHelper.createAuthorizedUser(app);
    } catch (error) {
        console.log(error);
    }
});

after(async () => {
    await authorizeUserHelper.removeAuthorizedUser();
    await dbConnectionHelper.closeConnection();
});