var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , ReferenceData = require('../../server/models/referenceData.js')
  , utils = require('./utils')
  , options = {};

describe('ReferenceData API', function() {

  var agent = request.agent(app);

  before(function(done) {
    utils.seedWithTestUserAndAuthenticate(agent, done);
  });

  beforeEach(function(done) {
    // Clean the ReferenceData collection
    ReferenceData.remove({}, function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  describe('GET /api/referenceData/:name', function() {

    it('Unauthenticated requests return 403', function(done) {
      request(app)
        .get('/api/referenceData/countries')
        .expect(403, done);
    });

    it ('should return reference data matching the :name parameter', function(done) {
      ReferenceData.create(
        {
          name: 'Counties',
          type: 'text',
          data: [
            { label: 'Yorkshire', value: 'Yorkshire' }, { label: 'Sussex', value: 'Sussex' }
          ]
        },
        {
          name: 'Marital Status',
          type: 'text',
          data: [
            { label: 'Married', value: 'Married' }, { label: 'Divorced', value: 'Divorced' }
          ]
        }
      );

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
    })
  });

});