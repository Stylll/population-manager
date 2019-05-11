import '@babel/polyfill';
import express from 'express';

const router = express.Router();

// create the error object in the request object
router.all('*', (request, response, next) => {
  request.errors = {};
  next();
});

router.get('/', (request, response) => {
  response.status(200)
    .json({ message: 'Welcome to Population Manager API version 1.' });
});

export default router;
