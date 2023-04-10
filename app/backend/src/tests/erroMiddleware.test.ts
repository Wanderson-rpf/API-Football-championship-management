const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe("Test value default of middleware-error", () => {
  // describe('1.0) Test error case in request invalid. ', () => {
  //   it('1.1) Test get /INTERNAL-ERROR.', async () => {
  //     const httpResponse = await chai
  //       .request(app)
  //       .post('/internal-error');
  //     expect(httpResponse.status).to.equal(500);
  //   })
  // });
});