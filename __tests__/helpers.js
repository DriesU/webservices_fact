/* eslint-disable quotes */
/* eslint-disable import/order */
const supertest = require('supertest');
const axios = require('axios');
const config = require('config');
const createServer = require('../src/createServer');
const { getKnex } = require('../src/data');



const fetchAccessToken = async () => {
  const response = await axios.post(config.get('auth.tokenUrl'), {
    grant_type: 'password',
    username: config.get('auth.testUser.username'),
    password: config.get('auth.testUser.password'),
    audience: config.get('auth.audience'),
    scope: 'openid profile email offline_access',
    client_id: config.get('auth.clientId'),
    client_secret: config.get('auth.clientSecret'),
  }, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" } ,
  });

  return response.data.access_token;
};
/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent and the Knex instance
 *
 * @returns {supertest.SuperAgentTest} A supertest agent.
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    //const token = await fetchAccessToken();
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5lNi1WNjVrLWM0OGlWWWdKMkFOdCJ9.eyJpc3MiOiJodHRwczovL2Rldi1obzN5bXczMG5vcW9yczZnLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ5NUR1bGowUW5tRktFOG0wVjhPUUVBdGl6VnVyamJxRUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly93ZWJzZXJ2aWNlRmFjdHMuYmUiLCJpYXQiOjE2NzE3OTcxMTUsImV4cCI6MTY3MTg4MzUxNSwiYXpwIjoieTVEdWxqMFFubUZLRThtMFY4T1FFQXRpelZ1cmpicUUiLCJzY29wZSI6IndyaXRlIG9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIHJlYWQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6WyJ3cml0ZSIsIm9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwicmVhZCJdfQ.ShUR0SWdOgpyZGWLZdcNHacPcmjdClA4VOzPwpfSpqMh_84jJWCd_ckBj0aSRK0ekN3Dtmck_adE4H2DVdDfbZDQlc2zKmfTom88V5yqMji3UgOdyWOQ4yCqlr2f-UWP89wd7CMqjXKJttc6EpDfttirDcz3dJHcc40v_92vFye2oygVEkULq24lvoAiWa6PEG0PfiEvmhLLb_bGIjNhzX0_WU5M27sYj8cejGqYtfRr5FCo-_Zbu9duJ3XL00X73zGsw77bShrYw7Py2PW8AiqVK9IJk4ODHOZ4r44POvKP8fobl8n9h22olK3-x0mcSsJaNNA98DYw5MTyLnLnmw';
    setter({
      knex: getKnex(),
      request: supertest(server.getApp().callback()),
      authHeader : `Bearer ${token}`,
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  fetchAccessToken,
  withServer,
};