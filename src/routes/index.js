import '@babel/polyfill';
import express from 'express';
import ErrorHandler from '../middlewares/ErrorHandler';
import ValidateLocation from '../middlewares/location/validateLocation';
import LocationController from '../controllers/LocationController';

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

router.post('/location', ValidateLocation.validateLocation, ValidateLocation.validateFemales,
  ValidateLocation.validateMales, ErrorHandler.handleErrors,
  LocationController.CreateLocation);

router.put('/location/:id', ValidateLocation.validateLocationExists,
  ValidateLocation.validateLocation, ValidateLocation.validateFemales,
  ValidateLocation.validateMales, ErrorHandler.handleErrors,
  LocationController.UpdateLocation);

router.delete('/location/:id', ValidateLocation.validateLocationExists,
  LocationController.DeleteLocation);

router.get('/location', LocationController.GetLocations);

export default router;
