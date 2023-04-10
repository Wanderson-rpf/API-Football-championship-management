const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
import { Model } from 'sequelize';
import { app } from '../app';
import { token } from './mocks/login.mocks';
import { 
  addMatchSuccess,
  listAllMatches, 
  match, 
  matchesInProgressFalse, 
  matchesInProgressTrue,
  newMatchEqualsTeams,
  newMatchInvalidTeam,
  newMatchValid,
  newResultMatch,
} from './mocks/matches.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe("Test route /MATCHES", () => {
  afterEach(sinon.restore)

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
      // expect(httpResponse.body).to.deep.equal(listAllMatches);
    })

    it('2.2) Test PATCH /MATCHES that filter progress query equal true.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: true });
      expect(httpResponse.status).to.equal(200);
      // expect(httpResponse.body).to.deep.equal(matchesInProgressTrue);
    })
    it('2.3) Test GET /MATCHES that filter progress query equal false.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: false });
      expect(httpResponse.status).to.equal(200);
      // expect(httpResponse.body).to.deep.equal(matchesInProgressFalse);
    })
  });

  describe('3.0) Test error case in PATCH /MATCHES. ', () => {
    it('3.1) Test PATCH /MATCHES error when using invalid ID to change status.', async () => {
      sinon.stub(Model, 'update').resolves(match)
      const httpResponse = await chai
        .request(app)
        .patch('/matches/100/finish')
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: "Match not found" })
    })
    it('3.2) Test PATCH /MATCHES error when using invalid ID to change result.', async () => {
      sinon.stub(Model, 'update').resolves(match)
      const httpResponse = await chai
        .request(app)
        .patch('/matches/100')
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: "Match not found" })
    })
  });

  describe('4.0) Test success case in PATCH /MATCHES. ', () => {
    it('4.1) Test PATCH /MATCHES update status match.', async () => {
      sinon.stub(Model, 'update').resolves(match)
      const httpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: "Finished" })
    })
    it('4.2) Test PATCH /MATCHES update result match.', async () => {
      sinon.stub(Model, 'update').resolves(match)
      const httpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send(newResultMatch)
        .set({ 'Authorization': token });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: "Score updated" })
    })
  });

  describe('5.0) Test error case in POST /MATCHES. ', () => {
    it('5.1) Test POST /MATCHES error add match with invalid teams.', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ 'Authorization': token })
        .send(newMatchInvalidTeam);
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: "There is no team with such id!" })
    })
    it('5.2) Test POST /MATCHES error add match with equals teams.', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ 'Authorization': token })
        .send(newMatchEqualsTeams);
      expect(httpResponse.status).to.equal(422);
      expect(httpResponse.body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" })
    })
  });

  describe('6.0) Test success case in POST /MATCHES. ', () => {
    it('6.1) Test POST /MATCHES add new match.', async () => {
      sinon.stub(Model, 'update').resolves(match)
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ 'Authorization': token })
        .send(newMatchValid);
      expect(httpResponse.status).to.equal(201);
      // expect(httpResponse.body).to.deep.equal(addMatchSuccess)
    })
  });
});