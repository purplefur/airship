var request = require('supertest')
  , expect  = require('chai').expect
  , app = require('../../server')
  , Screen = require('../../server/models/screen')
  , Employee = require('../../server/models/employee')
  , utils = require('./utils')
  , options = {};

describe('Screens API', function() {

  var agent = request.agent(app);

  before(function(done) {
    utils.seedWithTestUserAndAuthenticate(agent, done);
  });

  beforeEach(function(done) {
    // Clean the Screen collection
    Screen.remove({}).exec()
      .then(function() {
        Employee.remove({}).exec()
      })
      .then(done);
  });


  describe('GET /api/screens', function() {

    it('unauthenticated requests return 403', function (done) {
      request(app)
        .get('/api/screens')
        .expect(403, done);
    });

    it('should return all screens', function(done) {
      Screen.create({ _id: 1, name: 'General', multiple: [{ label: 'Name' }] });
      Screen.create({ _id: 2, name: 'Emergency Contacts', multiple: [{ label: 'Contact' }] });
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

    it('unauthenticated requests return 403', function (done) {
      request(app)
        .get('/api/screens/general/summary/data')
        .expect(403, done);
    });

    it('', function (done) {
      Screen.create({
        _id: 1,
        name: "General",
        multiple: [
          { label: "Id", source: "_id", type: "text" },
          { label: "Name", source: "name.display", type: "text" }
        ],
        single: [
          { label: "Id", type: "text", source: "_id" },
          { label: "Forename", type: "text", source: "name.forename" }
        ]
      });
      // User to authenticate is pre-created with 1,2 in it's context
      Employee.create({ _id: 1, name: { display: 'Bob Hope', forename: 'Bob', surname: 'Hope' }});
      Employee.create({ _id: 2, name: { display: 'No Hope', forename: 'No', surname: 'Hope' }});

      agent
        .get('/api/screens/General/multiple/data')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.body).to.not.be.null;
          expect(res.body.length).to.equal(2);
          expect(res.body[0].recordId).to.equal(1);
          expect(res.body[1].data[0].label).to.equal('Id');
          expect(res.body[1].data[1].value).to.equal('No Hope');
          done();
        });
    });

  });
});
