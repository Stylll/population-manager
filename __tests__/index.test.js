import request from 'supertest';
import app from '../src/index';


describe('Test suite for server', () => {
  it('should return API welcome message', (done) => {
    request(app)
      .get('/')
      .send({})
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome to the Population Manager API');
        done();
      });
  });

  it('should return API V1 welcome message', (done) => {
    request(app)
      .get('/api/v1')
      .send({})
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome to Population Manager API version 1.');
        done();
      });
  });

  it('should return 404 not found message', (done) => {
    request(app)
      .get('/nonexistingpage')
      .send({})
      .end((error, response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('404 Not Found');
        done();
      });
  });
});
