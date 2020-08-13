const Nes = require('@hapi/nes');
const axios = require('axios');
const { constants } = require('./constants');

const backendUrl = constants.backendUrl;
const baseUrl = `http://${backendUrl}`;
const wsUrl = `ws://${backendUrl}`;

const counter = {
  startedSockets: 0,
};

const getNesToken = async (token) => {
  const axiosInstance = axios.create({ baseURL: baseUrl });

  try {
    axiosInstance.defaults.headers.common['Authorization'] = token;
    return await axiosInstance.get('/nes/auth').then(x => x.data.token);
  } catch (e) {
    console.log(e);
  }
}

const startDevice = async (token, deviceId) => {
  const client = new Nes.Client(wsUrl);
  client.onConnect = () => { counter.startedSockets += 1 };

  client.onUpdate = (message) => {
    console.log(`Socket receive message: ${message}`);
  };

  client.onDisconnect = () => { counter.startedSockets -= 1 };

  await client.connect({ auth: token, reconnect: false });
  await client.message({ deviceId: Number(`${deviceId}`) });
}

const { deviceCount } = constants;

const startUser = async (token, userIndex) => {
  if (!token) return null;

  const nesToken = await getNesToken(token);

  for (let deviceIndex = 0; deviceIndex < deviceCount; deviceIndex += 1) {
    await startDevice(nesToken, `${userIndex}${deviceIndex}`)
  }
  return {};
};

module.exports = {
  startUser,
  counter,
}