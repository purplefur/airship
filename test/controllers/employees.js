var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , fixtures = require('pow-mongodb-fixtures').connect('airship-test')
  , Employee = require('../../server/models/employee')
  , utils = require('./utils')
  , options = {};

describe('Employee API', function() {

  var agent = request.agent(app);

  before(function(done) {
    utils.Authenticate(agent, done);
  });

  beforeEach(function(done) {
    fixtures.clear('employees', function(err) {
      if (err) {
        console.log(err);
      }
      fixtures.load(__dirname + '/employees-fixture.js', function (err) {
        if (err) {
          console.log(err);
        }
        done();
      });
    });
  });

  describe('GET /api/employees/:id', function() {

    it('Unauthenticated requests return 403', function(done) {
      request(app)
        .get('/api/employees/1')
        .expect(403, done);
    });

    it('should return a single employee for a valid id', function(done) {
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
      agent
        .get('/api/employees')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).not.to.be.null;
          expect(res.body).to.have.length(4);
          done();
        });
    });

    it('should return matching employees if a query string is supplied', function(done) {
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

  describe('PUT /api/employees/:id', function() {

    it('Unauthenticated requests return a 403 code', function(done) {
      request(app)
        .put('/api/employees/4')
        .expect(403, done);
    });

    it('Should update an employee if a valid id is supplied', function(done) {
      var updatedEmployee = {
        _id: 1011,
        name: {
          display: 'Geoffrey George',
          forename: 'Geoffrey',
          surname: 'George'
        },
        nationality: 'Irish'
      };

      agent
        .put('/api/employees/1011')
        .send(updatedEmployee)
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          Employee.findOne({ _id: 1011 }).exec(function(err, employee) {
            if (err) {
              throw err;
            }

            expect(employee.name.display).to.equal(updatedEmployee.name.display);
            expect(employee.nationality).to.equal(updatedEmployee.nationality);
            done();
          });
        });
    });

    it('Should return a 400 code if an invalid id is supplied', function(done) {
      var updatedEmployee = {
        _id: 1011,
        nationality: 'Irish'
      };

      agent
        .put('/api/employees/1015')
        .send(updatedEmployee)
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

