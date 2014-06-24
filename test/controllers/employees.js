var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , Employee = require('../../server/models/employee.js')
  , utils = require('./utils')
  , options = {};

describe('Employee API', function() {

  var agent = request.agent(app);

  before(function(done) {
    utils.seedWithTestUserAndAuthenticate(agent, done);
  });

  beforeEach(function(done) {
    // Clean the Employee collection
    Employee.remove({}, function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  describe('GET /api/employees/:id', function() {

    it('Unauthenticated requests return 403', function(done) {
      request(app)
        .get('/api/employees/1')
        .expect(403, done);
    });

    it('should return a single employee for a valid id', function(done) {
      Employee.create({ _id: 123, name: { display: 'Bob Hope', forename: 'Bob', surname: 'Hope' }});
      agent
        .get('/api/employees/123')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body.name.display).to.equal('Bob Hope');
          done();
        });
    });

    it('should return no employees for an invalid id', function(done) {
      Employee.create({ _id: 123, name: { display: 'Bob Hope', forename: 'Bob', surname: 'Hope' }});
      agent
        .get('/api/employees/999')
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

  describe('GET /api/employees', function() {

    it('Unauthenticated requests return 403', function(done) {
      request(app)
        .get('/api/employees')
        .expect(403, done);
    });

    it('should return all employees if no query string supplied', function(done) {
      Employee.create({ _id: 123, name: { display: 'Bob Hope', forename: 'Bob', surname: 'Hope' }});
      Employee.create({ _id: 456, name: { display: 'No Hope', forename: 'No', surname: 'Hope' }});
      Employee.create({ _id: 789, name: { display: 'Some Hope', forename: 'Some', surname: 'Hope' }});
      agent
        .get('/api/employees')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body).to.have.length(3);
          done();
        });
    });

    it('should return matching employees if a query string is supplied', function(done) {
      Employee.create({ _id: 123, name: { display: 'Bob Hope', forename: 'Bob', surname: 'Hope' }});
      Employee.create({ _id: 456, name: { display: 'No Hope', forename: 'No', surname: 'Hope' }});
      Employee.create({ _id: 789, name: { display: 'Almost No Hope', forename: 'Almost No', surname: 'Hope' }});
      agent
        .get('/api/employees?q=No')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body).to.have.length(2);
          done();
        });
    });
  });
});

