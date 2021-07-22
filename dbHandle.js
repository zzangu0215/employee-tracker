const util = require('util');
const defaultConnection = require('./db/connection');

class DBHandler {

  constructor(connection = defaultConnection) {
    this.connection = connection;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          return reject(error);
        }
        this.connection.query = util.promisify(this.connection.query);
        resolve();
      });
    });
  }

  close_connection(callback) {
    return this.connection.end(callback);
  }
}

module.exports = DBHandler;