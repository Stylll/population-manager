import Client from '../connect';

export default class LocationQueries {
  /**
   * static method to create a location in the database
   * @param {array} values
   * @returns {object} query response
   */
  static async CreateLocation(values) {
    const query = 'INSERT INTO location (location, no_of_males, no_of_females) VALUES ($1, $2, $3) RETURNING *';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }

  /**
   * static method to update a location in the database
   * @param {array} values
   * @returns {object} query response
   */
  static async UpdateLocation(values) {
    const query = 'update location set location = $1, no_of_males = $2, no_of_females = $3 where id = $4 RETURNING *';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }

  /**
   * static method to get locations in the database
   * @param {stirng} where
   * @param {array} values
   * @returns {object} query response
   */
  static async GetLocations(where, values) {
    let query = 'SELECT * FROM location ';
    if (where) query += where;
    query += ';';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }

  /**
   * static method to delete locations from the database
   * @param {stirng} where
   * @param {array} values
   * @returns {object} query response
   */
  static async DeleteLocations(where, values) {
    let query = 'DELETE FROM location ';
    if (where) query += where;
    query += ';';
    try {
      const response = await Client.query(query, values);
      return response;
    } catch (error) {
      throw (error);
    }
  }

  /**
   * static method to truncate locations from the database
   * @param {stirng} where
   * @param {array} values
   * @returns {object} query response
   */
  static async TruncateLocations() {
    const query = 'TRUNCATE TABLE location RESTART IDENTITY;';
    try {
      const response = await Client.query(query, []);
      return response;
    } catch (error) {
      throw (error);
    }
  }
}
