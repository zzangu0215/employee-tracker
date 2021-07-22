const DBHandler = require('./db/dbHandle');
const CLI = require('./lib/cli');

const dbHandler = new DBHandler();
const cli = new CLI(dbHandler);

cli.start();