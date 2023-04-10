const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';
import { reportAway, reportGeneral, reportHome } from './mocks/leaderboard.mock';
import { token } from './mocks/login.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe("Test route /MATCHES", () => {
  describe('1.0) Test success case in GET /LEADERBOARD. ', () => {
    it('1.1) Test GET /LEADERBOARD/HOME get information matches in home.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(reportHome);
    })
    it('1.1) Test GET /LEADERBOARD/AWAY get information matches in away.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(reportAway);
    })
    it('1.1) Test GET /LEADERBOARD get all information.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/leaderboard')
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(reportGeneral);
    })
  });
});