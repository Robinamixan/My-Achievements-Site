const dbConnectionHelper = require('./helpers/db-connection');
const authorizeUserHelper = require('./helpers/authorized-user');
const appServer = require('../app-server');

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