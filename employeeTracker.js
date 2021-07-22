const DBHandler = require('./dbHandle');
const CLI = require('./cli');

const dbHandler = new DBHandler();
const cli = new CLI(dbHandler);

cli.start();