var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , User = require('../../server/models/user')
  , utils = require('./utils')
  , options = {};

describe('User API', function() {

  // CHECK OUT pow-mongodb-fixtures!!

  var agent = request.agent(app);

  before(function(done) {
    utils.seedWithTestUserAndAuthenticate(agent, done);
  });

  describe('GET /api/users', function() {

    it('unauthenticated requests return 403', function(done) {
      request(app)
        .get('/api/users')
        .expect(403, done);
    });

    it('should return all users', function(done) {
      User.create({ username: 'aa', hashed_pwd: 'fsfjdfkldkfjskf' });
      User.create({ username: 'bb', hashed_pwd: 'fsfjdfkldkfjskf' });
      User.create({ username: 'cc', hashed_pwd: 'fsfjdfkldkfjskf' });
      agent
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body).to.have.length(4); // includes seed user for authentication
          done();
        });
    });
  });

  describe('GET /api/users/:id', function() {

    it('unauthenticated requests return 403', function(done) {
      request(app)
        .get('/api/users/invalidId')
        .expect(403, done);
    });

    it('should return a single user where a match succeeds', function(done) {
      User.create([{ username: 'abc' }, { username: 'def' }])
        .then(function(res) {
          agent
            .get('/api/users/' + res._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              expect(res.body).not.to.be.null;
              expect(res.body.username).to.equal('abc');
              done();
            });
        });
    });

    it('should return a single user where a match succeeds', function(done) {
      User.create([{ username: 'ghi' }, { username: 'jkl' }])
        .then(function(res) {
          agent
            .get('/api/users/' + res._id + 'invalid')
            .expect(200)
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              expect(res.body).to.be.empty;
              done();
            });
        });
    });

  });

  describe('PUT /api/users/:id', function() {

    it('unauthenticated requests return 403', function (done) {
      request(app)
        .put('/api/users/123')
        .expect(403, done);
    });

    it('should update an existing record when valid id supplied', function (done) {
      User.create({ username: 'jeff', roles: ['user'], contexts: [] })
        .then(function(user) {
          user.contexts.push({ label: 'new context', data: [{ _id: 1 }, { _id: 2}] });
          agent
            .put('/api/users/' + user._id)
            .set('Content-Type', 'application/json')
            .send(user)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              expect(res.body.contexts).to.not.be.empty;
              expect(res.body.contexts[0].data).to.have.length(2);
              done();
            });
        });
    });

  });
});