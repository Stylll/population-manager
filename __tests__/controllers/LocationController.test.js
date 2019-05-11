import request from 'supertest';
import app from '../../src/index';
import LocationQueries from '../../src/database/queries/location';

describe('Test suite for Location controller', () => {
  beforeAll(async (done) => {
    await LocationQueries.TruncateLocations();
    done();
  });

  afterAll(async (done) => {
    await LocationQueries.TruncateLocations();
    done();
  });
  describe('Test suite for Location controller - POST:', () => {
    it('should create location and return proper data', (done) => {
      request(app)
        .post('/api/v1/location')
        .send({
          location: 'Lagos',
          no_of_males: '20',
          no_of_females: '30',
        })
        .end((error, response) => {
          expect(response.status).toBe(201);
          expect(response.body.message).toBe('Location created successfully');
          expect(response.body.data.location).toBe('Lagos');
          expect(response.body.data.no_of_males).toBe(20);
          expect(response.body.data.no_of_females).toBe(30);
          done();
        });
    });

    it('should return 409 if location already exists', (done) => {
      request(app)
        .post('/api/v1/location')
        .send({
          location: 'Lagos',
          no_of_males: '20',
          no_of_females: '30',
        })
        .end((error, response) => {
          expect(response.status).toBe(400);
          expect(response.body.errors.location.message).toBe('Location Lagos already exists');
          expect(response.body.errors.location.statusCode).toBe(409);
          done();
        });
    });

    it('should return 400 bad request if required fields are not provided', (done) => {
      request(app)
        .post('/api/v1/location')
        .send({})
        .end((error, response) => {
          expect(response.status).toBe(400);
          expect(response.body.errors.location.message).toBe('Location is required');
          expect(response.body.errors.no_of_males.message).toBe('Number of males is required');
          expect(response.body.errors.no_of_females.message).toBe('Number of females is required');
          done();
        });
    });

    it('should return 400 bad request if required fields are not empty', (done) => {
      request(app)
        .post('/api/v1/location')
        .send({
          location: '  ',
          no_of_males: '  ',
          no_of_females: '  ',
        })
        .end((error, response) => {
          expect(response.status).toBe(400);
          expect(response.body.errors.location.message).toBe('Location is required');
          expect(response.body.errors.no_of_males.message).toBe('Number of males is required');
          expect(response.body.errors.no_of_females.message).toBe('Number of females is required');
          done();
        });
    });
  });

  describe('Test suite for Location controller - PUT:', () => {
    it('should return 400 bad request if required fields are not provided', (done) => {
      request(app)
        .put('/api/v1/location/1')
        .send({})
        .end((error, response) => {
          expect(response.status).toBe(400);
          expect(response.body.errors.location.message).toBe('Location is required');
          expect(response.body.errors.no_of_males.message).toBe('Number of males is required');
          expect(response.body.errors.no_of_females.message).toBe('Number of females is required');
          done();
        });
    });
    it('should return error message if location is not found', (done) => {
      request(app)
        .put('/api/v1/location/99')
        .send({})
        .end((error, response) => {
          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Location with id: 99 does not exist');
          done();
        });
    });
    it('should update the location', (done) => {
      request(app)
        .put('/api/v1/location/1')
        .send({
          location: 'Abuja',
          no_of_males: '20',
          no_of_females: '30',
        })
        .end((error, response) => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('Location updated successfully');
          expect(response.body.data.location).toBe('Abuja');
          expect(response.body.data.no_of_males).toBe(20);
          expect(response.body.data.no_of_females).toBe(30);
          done();
        });
    });
  });

  describe('Test suite for Location controller - GET:', () => {
    beforeAll(async (done) => {
      await LocationQueries.CreateLocation(['Kaduna', '200', '100']);
      await LocationQueries.CreateLocation(['London', '230', '400']);
      await LocationQueries.CreateLocation(['Ibadan', '100', '150']);
      done();
    });
    it('should return a list of locations with total residents count', (done) => {
      request(app)
        .get('/api/v1/location')
        .send({})
        .end((error, response) => {
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBe(4);
          expect(response.body.message).toBe('Location list retrieved successfully');
          const location = response.body.data[1];
          expect(location.location).toBe('Kaduna');
          expect(location.no_of_males).toBe(200);
          expect(location.no_of_females).toBe(100);
          expect(location.total_residents).toBe(300);
          done();
        });
    });
  });

  describe('Test suite for Location controller - DELETE:', () => {
    it('should return error if location does not exist', (done) => {
      request(app)
        .delete('/api/v1/location/99')
        .send({})
        .end((error, response) => {
          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Location with id: 99 does not exist');
          done();
        });
    });
    it('should delete a location', (done) => {
      request(app)
        .delete('/api/v1/location/1')
        .send({})
        .end((error, response) => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('Location deleted successfully');
          done();
        });
    });
  });
});
