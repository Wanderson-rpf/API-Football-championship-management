const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';
import { token, tokenExpired, tokenInvalid } from './mocks/login.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe("Test route /LOGIN", () => {
  describe('1.0) Test error case in POST /LOGIN. ', () => {
    it('1.1) Test POST /LOGIN with empty data.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({});
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" })
    })

    it('1.2) Test POST /LOGIN with invalid email.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: "admin-admin.com",
        password: "secret_admin"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    })

    it('1.3) Test POST /LOGIN with invalid password.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: "sec"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    })

    it('1.4) Test POST /LOGIN with non-existent email in the database.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: "adminAdmin@admin.com",
        password: "secret_admin"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    })

    it('1.5) Test POST /LOGIN with non-existent password in the database.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_adminA"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: "Invalid email or password" })
    })
  });

  describe('2.0) Test success case in POST /LOGIN. ', () => {
    it('2.1) Test POST /LOGIN with valid data.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_admin"
      });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.have.property('token');
    })
  });

  describe('3.0) Test error case in GET /LOGIN/ROLE. ', () => {
    it('3.1) Test GET /LOGIN/ROLE with empty token in header.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/role');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: "Token not found" })
    })

    it('3.2) Test GET /LOGIN/ROLE with invalid token in header.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/role')
        .set({ 'Authorization': tokenInvalid }); // Use set function to set http headers.
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: "Token must be a valid token" })
    })

    it('3.3) Test GET /LOGIN/ROLE with expired token in header.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/role')
        .set({ 'Authorization': tokenExpired }); // Use set function to set http headers.
      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.deep.equal({ message: "WHERE parameter \"email\" has invalid \"undefined\" value" })
    })
  });

  describe('4.0) Test success case in GET /LOGIN/ROLE. ', () => {
    it('4.1) Test POST /LOGIN with valid data.', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/role')
        .set({ 'Authorization': token }); // Use set function to set http headers.
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ role: "admin" })
    })
  });
});