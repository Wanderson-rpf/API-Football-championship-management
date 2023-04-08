const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
import { App } from '../app';

chai.use(chaiHttp);
const { expect } = chai;
const PORT = 5555;
let server: App;
server = new App();


describe("Test APP listen", () => {
  describe('1.0) Test if app started on required port. ', () => {
    it('1.1) Test if App is running.', (done) => {
      const appSpy = sinon.spy(server, 'start');
      server.start(PORT);
      expect(appSpy.calledWith(PORT)).to.equal(true);
      done();
    })
  });
});