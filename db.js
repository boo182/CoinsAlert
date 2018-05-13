
import mysql from 'mysql';

const  knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'Coins',
    }
  });

export default knex;