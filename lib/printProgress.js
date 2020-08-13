const { spelling } = require('./spelling');
const { Console } = require('console');
let { counter } = require('../nes');
const startTestTime = new Date();

const countTime = () => {
  const now = new Date;

  const elapsedTime = (now - startTestTime)
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = ((elapsedTime % 60000) / 1000).toFixed(0);

  return `Test running ${spelling(minutes, 'minute')} ${spelling(seconds, 'second')}`;
};

function printProgress() {
  setInterval(() => {
    console.clear();
    console.log(`
      ${countTime()}
      Stared sockets count: ${counter.startedSockets}
    `)
  }, 50)
}

module.exports = {
  printProgress,
}