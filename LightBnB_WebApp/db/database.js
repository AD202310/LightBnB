const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool ({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});


// pool.query(`
// SELECT id, email, password
// FROM users
// WHERE id = 1007;
// `)
// .then(response => {console.log(response.rows)});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email = 'sebastianguerra@ymail.com') {
  return pool
    .query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email])
    .then ((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    })
};
// getUserWithEmail();

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function (id = 10) {
  return pool
    .query(`
    SELECT *
    FROM users
    WHERE id = $1
    `, [id])
    .then ((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    })
};
// getUserWithId();

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser = function (user = {
  name: 'AD',
  email: 'ad@gmail.com',
  password: 'secret'
}) {
  return pool
    .query(`
      INSERT INTO users 
      (name, email, password) 
      VALUES ($1, $2,$3)
      RETURNING *;`, [user.name, user.email, user.password]
    )
    .then ((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    })
};
// addUser();

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// getAllProperties();


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};


