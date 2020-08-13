const { getUsersCredentials } = require('./getUsersCredentials');
const { startUser } = require('./nes');
const { printProgress } = require('./lib/printProgress');
const { constants } = require('./constants');

const startServer = async () => {
  getUsersCredentials()
    .then(async (users) => {
      printProgress();

      let userCount = users.length;

      if (constants.userCount && Math.abs(constants.userCount) < users.length) {
        userCount = Math.abs(constants.userCount);
      }

      for (let userIndex = 0; userIndex < userCount; userIndex += 1) {
        await startUser(users[userIndex], userIndex)
      }
      return null;
    })
};

startServer();
