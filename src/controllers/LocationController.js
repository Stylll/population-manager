import LocationQueries from '../database/queries/location';

export default class LocationController {
  /**
   * static method to create location
   * @param {object} request
   * @param {object} response
   * @returns {object} location object or error message
   */
  static async CreateLocation(request, response) {
    const { location, no_of_males: noOfMales, no_of_females: noOfFemales } = request.body;
    try {
      const dbResponse = await LocationQueries.CreateLocation([location, noOfMales, noOfFemales]);
      if (dbResponse.rows.length) {
        const dbLocation = dbResponse.rows[0];
        const newLocation = {
          id: dbLocation.id,
          location: dbLocation.location,
          no_of_males: dbLocation.no_of_males,
          no_of_females: dbLocation.no_of_females,
          createdAt: dbLocation.createdAt,
        };
        return response.status(201)
          .json({ data: newLocation, message: 'Location created successfully' });
      }
      return response.status(500).json({
        message: 'An error occured while creating the location',
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  /**
   * static method to update location
   * @param {object} request
   * @param {object} response
   * @returns {object} location object or error message
   */
  static async UpdateLocation(request, response) {
    const { id } = request.params;
    const { location, no_of_males: noOfMales, no_of_females: noOfFemales } = request.body;
    try {
      const dbResponse = await LocationQueries
        .UpdateLocation([location, noOfMales, noOfFemales, id]);
      if (dbResponse.rows.length) {
        const dbLocation = dbResponse.rows[0];
        const newLocation = {
          id: dbLocation.id,
          location: dbLocation.location,
          no_of_males: dbLocation.no_of_males,
          no_of_females: dbLocation.no_of_females,
          createdAt: dbLocation.createdAt,
        };
        return response.status(200)
          .json({ data: newLocation, message: 'Location updated successfully' });
      }
      return response.status(500).json({
        message: 'An error occured while updating the location',
      });
    } catch (error) {
      console.log('error: ', error);
      return response.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  /**
   * static method to delete a location
   * @param {object} request
   * @param {object} response
   * @returns {object} location object or error message
   */
  static async DeleteLocation(request, response) {
    const { id } = request.params;
    try {
      const where = 'where id = $1';
      await LocationQueries.DeleteLocations(where, [id]);
      return response.status(200)
        .json({ message: 'Location deleted successfully' });
    } catch (error) {
      console.log('error: ', error);
      return response.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
