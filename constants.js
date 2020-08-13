const minimist = require('minimist');

const constants = minimist(process.argv.slice(2), {
  alias: {
    u: 'userCount',
    d: 'deviceCount',
    b: 'backendUrl',
  },
  default: {
    u: null,
    d: 1,
    b: 'localhost'
  }
});

module.exports = {
  constants,
};
