const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const usersArrayPath = path.join(__dirname, 'employeesCredentials.csv');

const getUsersCredentials = async () => (
  new Promise((resolve, reject) => {
    const users = [];

    fs.createReadStream(usersArrayPath)
      .pipe(csv())
      .on('data', row => users.push(row.token))
      .on('end', () => resolve(users))
  }));

module.exports = {
  getUsersCredentials,
}