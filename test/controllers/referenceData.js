var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , fixtures = require('pow-mongodb-fixtures').connect('airship-test')
  , utils = require('./utils')
  , options = {};

describe('ReferenceData API', function() {

  var agent = request.agent(app);

  before(function(done) {
    utils.Authenticate(agent, done);
  });

  beforeEach(function(done) {
    fixtures.clear('referenceData', function(err) {
      if (err) {
        console.log(err);
      }
      fixtures.load(__dirname + '/referenceData-fixture.js', function (err) {
        if (err) {
          console.log(err);
        }
        done();
      });
    });
  });

  describe('GET /api/referenceData', function() {

    it('Unauthenticated requests return 403 code', function(done) {
      request(app)
        .get('/api/referenceData')
        .expect(403, done);
    });

    it('Should return all reference data types when authenticated', function (done) {
      agent
        .get('/api/referenceData')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).to.have.length(2);
          expect(res.body[0].name).to.equal('Counties');
          expect(res.body[1].name).to.equal('Marital Status');
          done();
        });
    });
  });

  describe('GET /api/referenceData/:name', function() {

    it('Unauthenticated requests return 403 code', function(done) {
      request(app)
        .get('/api/referenceData/countries')
        .expect(403, done);
    });

    it ('Should return reference data matching the :name parameter', function(done) {

      agent
        .get('/api/referenceData/Marital%20Status')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body.name).to.equal('Marital Status');
          expect(res.body.data).to.have.length(2);
          expect(res.body.data[0].label).to.equal('Married');
          done();
        });
    });

    it ('Non-matching :name parameter returns 400 code', function(done) {

      agent
        .get('/api/referenceData/Nationality')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.text).to.equal('Invalid Name');
          expect(res.body).to.be.empty;
          done();
        });
    })

  });

});