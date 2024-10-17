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

/* Async Await doesn't work -> "error" : "Cannot read properties of undefined (reading 'query')"
export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
*/


/*
 * I might not end up needing an .env.local nor @/lib/db.js file, given 
 * the config file essentially handles the MySQL configurations? 
 * Nonetheless, the .env.local file is only meant for developing LOCALLY,
 * likely in the early stages of development as well. Once EBBP is on a public
 * domain (or even deployed on Vercel), it can't have an .env.local file since
 * ... its not really local anymore now. Additionally, .env.local files often
 * contain sensitive info like API keys, db credentials, and secret tokens. 
 * So a .env.local file is not used when a project is deployed to a public
 * domain. Instead, environment variables are configured directly on the server
 * or deployment platform. These variables are injected at runtime, ensuring
 * that sensitive information like db credentials is securely handled in 
 * production. 
 * For example, deploying on Vercel would require you to go to the
 * project's dashboard, navigate to Settings > Environment Variables, and add
 * your database credentials (like MYSQL_HOST, MYSQL_USER, etc.).
 * 
 * tldr public domains need Environment Variables that reflect your .env.local
 * might keep this file after all since i don't see any promises used to create
 * a connection pool anywhere in the folders Sequelize-cli has created
 * 
 * 
*/