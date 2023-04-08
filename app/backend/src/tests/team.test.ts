const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe("Test route /TEAM", () => {
  describe('1.0) GET /TEAM. ', () => {
    it('1.1) Test GET in /TEAM', async () => {
      const httpResponse = await chai.request(app).get('/teams').send({});
      expect(httpResponse.status).to.equal(200);
    })

    it('1.2) Test GET in /TEAM/:id', async () => {
      const httpResponse = await chai.request(app).get('/teams/1').send({});
      expect(httpResponse.status).to.equal(200);
    })
  });
});