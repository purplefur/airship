var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , fixtures = require('pow-mongodb-fixtures').connect('airship-test')
  , Entity = require('../../server/models/entity')
  , utils = require('./utils')
  , options = {};

describe('Entities API', function() {

  var agent = request.agent(app);

  before(function (done) {
    utils.Authenticate(agent, done);
  });

  beforeEach(function (done) {
    fixtures.clear('entities', function (err) {
      if (err) {
        console.log(err);
      }
      fixtures.load(__dirname + '/entities-fixture.js', function (err) {
        if (err) {
          console.log(err);
        }
        done();
      });
    });
  });

  describe('GET /api/entities', function () {

    it('Unauthenticated requests return 403', function (done) {
      request(app)
        .get('/api/entities')
        .expect(403, done);
    });

    it('Should return all entities when authenticated', function (done) {
      agent
        .get('/api/entities')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).to.have.length(2);
          expect(res.body[0].name).to.equal('Employee');
          expect(res.body[1].plural).to.be.undefined;
          done();
        });
    });
  });

  describe('GET /api/entities/:id', function () {

    it('Unauthenticated requests return 403', function (done) {
      request(app)
        .get('/api/entities/1')
        .expect(403, done);
    });

    it('Should return the correct entity when authenticated', function (done) {
      agent
        .get('/api/entities/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          expect(res.body.name).to.equal('Post');
          expect(res.body.screens).to.have.length(2);
          expect(res.body.screens[0].name).to.equal('Details');
          done();
        });
    });

    it('Should return a 400 code if an invalid id is supplied', function(done) {
      agent
        .get('/api/entities/28')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          expect(res.text).to.equal('Invalid Id');
          expect(res.body).to.be.empty;
          done();
        });
    });

  });

});

