const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';

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
  });
  
  describe('2.0) Test success case in POST /LOGIN. ', () => {
    it('2.1) Test POST /LOGIN with valid data.', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_admin"
      });
      expect(httpResponse.status).to.equal(200);
    })
  });
});