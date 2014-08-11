var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , fixtures = require('pow-mongodb-fixtures').connect('airship-test')
  , Entity = require('../../server/models/entity')
  , fixtureData = require('./entities-fixture')
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
      var secondEntity = fixtureData.entities[1];

      agent
        .get('/api/entities/' + secondEntity._id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          expect(res.body.name).to.equal(secondEntity.name);
          expect(res.body.screens).to.have.length(secondEntity.screens.length);
          expect(res.body.screens[0].name).to.equal(secondEntity.screens[0].name);
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

  describe('PUT /api/entities/:id', function() {

    it('Unauthenticated requests return a 403 code', function (done) {
      request(app)
        .put('/api/entities/4')
        .expect(403, done);
    });

    it('Should update an entity if a valid id is supplied', function (done) {
      var updatedEntity = fixtureData.entities[1];
      updatedEntity.name = 'PostX';
      updatedEntity.screens[1].fields[1].label = 'TitleX';

      agent
        .put('/api/entities/' + updatedEntity._id)
        .send(updatedEntity)
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          Entity.findOne({ _id: updatedEntity._id }).exec(function (err, entity) {
            if (err) {
              throw err;
            }

            expect(entity.name).to.equal(updatedEntity.name);
            expect(entity.screens[1].fields[1].label).to.equal(updatedEntity.screens[1].fields[1].label);
            done();
          });
        });
    });

    it('Should return a 400 code if an invalid id is supplied', function (done) {
      var updatedEntity = fixtureData.entities[1];

      agent
        .put('/api/employees/9999')
        .send(updatedEntity)
        .set('Content-Type', 'application/json')
        .expect(400)
        .end(function (err, res) {
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

