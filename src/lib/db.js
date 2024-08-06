/* Promises
 * Object in JS that represents the eventual completion (or failure) of an 
 * asynchronous operation and its resulting value. Promises are used to handle
 * async code in a more mangeable and readable way than traditional callbacks.
*/

import mysql from 'mysql2/promise'; // promise handling db queries asyncly

const connectionConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createPool(connectionConfig);

export default connection;
