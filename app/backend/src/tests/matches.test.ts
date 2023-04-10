const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
import { Model } from 'sequelize';
import { app } from '../app';
import { 
  listAllMatches, 
  match, 
  matchesInProgressFalse, 
  matchesInProgressTrue,
} from './mocks/matches.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe("Test route /MATCHES", () => {
  describe('1.0) Test error case in GET /MATCHES. ', () => {
    it('1.1) Test GET /MATCHES that filter progress query with error.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'invalid' });
      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.deep.equal({ message: "Invalid parameter" });
    })
  });

  describe('2.0) Test success case in GET /MATCHES. ', () => {
    it('2.1) Test GET /MATCHES for get all matches.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(listAllMatches);
    })

    it('2.2) Test PATCH /MATCHES that filter progress query equal true.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: true });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(matchesInProgressTrue);
    })
    it('2.3) Test GET /MATCHES that filter progress query equal false.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: false });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(matchesInProgressFalse);
    })
  });

  // describe('3.0) Test error case in PATCH /MATCHES. ', () => {
  //   it('3.1) Test PATCH /MATCHES invalid endpoint.', async () => {
  //     sinon.stub(Model, 'update').resolves(match)
  //     const httpResponse = await chai
  //       .request(app)
  //       .patch('/matches/1');
  //     expect(httpResponse.status).to.equal(200);
  //     expect(httpResponse.body).to.deep.equal({ message: "Finished" })
  //   })
  // });

  describe('4.0) Test success case in PATCH /MATCHES. ', () => {
    it('4.1) Test PATCH /MATCHES update status match.', async () => {
      sinon.stub(Model, 'update').resolves(match)
      const httpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: "Finished" })
    })
  });
});