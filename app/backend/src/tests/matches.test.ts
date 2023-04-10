const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
import { Model } from 'sequelize';
import { app } from '../app';
import { 
  listAllMatches, 
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

    // it('1.2) Test POST /LOGIN with invalid email.', async () => {
    //   const httpResponse = await chai.request(app).post('/login').send({
    //     email: "admin-admin.com",
    //     password: "secret_admin"
    //   });
    //   expect(httpResponse.status).to.equal(401);
    //   expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    // })

    // it('1.3) Test POST /LOGIN with invalid password.', async () => {
    //   const httpResponse = await chai.request(app).post('/login').send({
    //     email: "admin@admin.com",
    //     password: "sec"
    //   });
    //   expect(httpResponse.status).to.equal(401);
    //   expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    // })

    // it('1.4) Test POST /LOGIN with non-existent email in the database.', async () => {
    //   const httpResponse = await chai.request(app).post('/login').send({
    //     email: "adminAdmin@admin.com",
    //     password: "secret_admin"
    //   });
    //   expect(httpResponse.status).to.equal(401);
    //   expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    // })

    // it('1.5) Test POST /LOGIN with non-existent password in the database.', async () => {
    //   const httpResponse = await chai.request(app).post('/login').send({
    //     email: "admin@admin.com",
    //     password: "secret_adminA"
    //   });
    //   expect(httpResponse.status).to.equal(401);
    //   expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    // })
  });

  describe('2.0) Test success case in GET /MATCHES. ', () => {
    it('2.1) Test GET /MATCHES for get all matches.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(listAllMatches);
    })

    it('2.2) Test GET /MATCHES that filter progress query equal true.', async () => {
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

  // describe('3.0) Test error case in GET /LOGIN/ROLE. ', () => {
  //   it('3.1) Test GET /LOGIN/ROLE with empty token in header.', async () => {
  //     const httpResponse = await chai
  //       .request(app)
  //       .get('/login/role');
  //     expect(httpResponse.status).to.equal(401);
  //     expect(httpResponse.body).to.deep.equal({ message: "Token not found" })
  //   })

  //   it('3.2) Test GET /LOGIN/ROLE with invalid token in header.', async () => {
  //     const httpResponse = await chai
  //       .request(app)
  //       .get('/login/role')
  //       .set({ 'Authorization': tokenInvalid }); // Use set function to set http headers.
  //     expect(httpResponse.status).to.equal(401);
  //     expect(httpResponse.body).to.deep.equal({ message: "Token must be a valid token" })
  //   })

  //   it('3.3) Test GET /LOGIN/ROLE with expired token in header.', async () => {
  //     const httpResponse = await chai
  //       .request(app)
  //       .get('/login/role')
  //       .set({ 'Authorization': tokenExpired }); // Use set function to set http headers.
  //     expect(httpResponse.status).to.equal(500);
  //     expect(httpResponse.body).to.deep.equal({ message: "WHERE parameter \"email\" has invalid \"undefined\" value" })
  //   })
  // });

  // describe('4.0) Test success case in GET /LOGIN/ROLE. ', () => {
  //   it('4.1) Test POST /LOGIN with valid data.', async () => {
  //     const httpResponse = await chai
  //       .request(app)
  //       .get('/login/role')
  //       .set({ 'Authorization': token }); // Use set function to set http headers.
  //     expect(httpResponse.status).to.equal(200);
  //     expect(httpResponse.body).to.deep.equal({ role: "admin" })
  //   })
  // });
});