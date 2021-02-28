import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host : process.env.DBHOST,
    user : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DBDATABASE
  }
});

export default connection;