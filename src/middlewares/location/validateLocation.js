import {
  isEmpty,
} from 'validator';
import LocationQueries from '../../database/queries/location';

class ValidateLocation {
  /**
   * static method to validate location
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateLocation(request, response, next) {
    const { location } = request.body;

    if (!location) {
      request.errors.location = {
        message: 'Location is required',
        statusCode: 400,
      };

      return next();
    }

    if (isEmpty(location, { ignore_whitespace: true })) {
      request.errors.location = {
        message: 'Location is required',
        statusCode: 400,
      };

      return next();
    }

    try {
      const where = 'where lower(location) like $1';
      const values = [location.toLowerCase()];
      const dbResponse = await LocationQueries.GetLocations(where, values);
      if (dbResponse.rows.length) {
        request.errors.location = {
          message: `Location ${location} already exists`,
          statusCode: 409,
        };
      }
    } catch (error) {
      console.log('error: ', error);
    }

    return next();
  }

  /**
   * static method to validate Males
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateMales(request, response, next) {
    const { no_of_males: noOfMales } = request.body;
    if (!noOfMales) {
      request.errors.no_of_males = {
        message: 'Number of males is required',
        statusCode: 400,
      };

      return next();
    }

    if (isEmpty(noOfMales, { ignore_whitespace: true })) {
      request.errors.no_of_males = {
        message: 'Number of males is required',
        statusCode: 400,
      };

      return next();
    }

    return next();
  }

  /**
   * static method to validate Females
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateFemales(request, response, next) {
    const { no_of_females: noOfFemales } = request.body;
    if (!noOfFemales) {
      request.errors.no_of_females = {
        message: 'Number of females is required',
        statusCode: 400,
      };

      return next();
    }

    if (isEmpty(noOfFemales, { ignore_whitespace: true })) {
      request.errors.no_of_females = {
        message: 'Number of females is required',
        statusCode: 400,
      };

      return next();
    }

    return next();
  }

  /**
   * static method to validate a location exists
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object|function} error object | next function
   */
  static async validateLocationExists(request, response, next) {
    const { id } = request.params;
    try {
      const where = 'where id = $1';
      const values = [id];
      const dbResponse = await LocationQueries.GetLocations(where, values);
      if (!dbResponse.rows.length) {
        return response.status(404).json({ message: `Location with id: ${id} does not exist` });
      }
    } catch (error) {
      console.log('error: ', error);
    }

    return next();
  }
}

export default ValidateLocation;
