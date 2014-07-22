var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , fixtures = require('pow-mongodb-fixtures').connect('airship-test')
  , utils = require('./utils')
  , options = {};

describe('Screens API', function() {

  var agent = request.agent(app);

  before(function(done) {
    utils.Authenticate(agent, done);
  });

  beforeEach(function(done) {
    fixtures.clear(['screens', 'employees'], function(err) {
      if (err) {
        console.log(err);
      }
      fixtures.load(__dirname + '/screens-fixture.js', function (err) {
        if (err) {
          console.log(err);
        }
        done();
      });
    });
  });

  describe('GET /api/screens', function() {

    it('unauthenticated requests return 403', function (done) {
      request(app)
        .get('/api/screens')
        .expect(403, done);
    });

    it('should return all screens', function(done) {
      agent
        .get('/api/screens')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body).to.have.length(2);
          expect(res.body[1].multiple[0].label).to.equal('Contact');
          done();
        });
    });
  });

  describe('GET /api/screens/:name/:view/data', function() {

    it('Unauthenticated requests return 403 code', function (done) {
      request(app)
        .get('/api/screens/general/summary/data')
        .expect(403, done);
    });

    it('Valid requests for multiple record data succeed', function (done) {
      agent
        .get('/api/screens/General/multiple/data')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          expect(res.body).to.not.be.null;
          expect(res.body.length).to.equal(2);
          expect(res.body[0]._id).to.equal(1);
          expect(res.body[1].data[0].label).to.equal('Id');
          expect(res.body[1].data[1].value).to.equal('No Hope');
          // check non-mandatory fields
          expect(res.body[0].data[2].value).to.equal('Irish');
          expect(res.body[1].data[2].value).to.equal('');
          done();
        });
    });

    // TODO: test for a "single" request - needs the context for the admin user altering

    // TODO: test for an invalid page

    // TODO: test for a "single" request when context contains multiple employees

  });
});
