const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const makeTable = () => {
  return new Promise(function(resolve, reject) {
    pool.query('CREATE TABLE [IF NOT EXISTS] tdl_items ( id SERIAL PRIMARY KEY, title VARCHAR(60), due TIMESAMPTZ, complete boolean );', (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  })
}

const getItems = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM items', (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  })
}

const createItem = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, due, complete } = body
    pool.query('INSERT INTO items (title, due, complete) VALUES ($1, $2, $3) RETURNING *', [title, due, complete], (error, res) => {
      if (err) {
        reject(err);
      }
      resolve(`A new item has been added: ${res.rows[0]}`);
    });
  })
}

const deleteItem = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM items WHERE id = $1', [id], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(`Item deleted with id: ${id}`);
    });
  })
}

module.exports = {
  makeTable,
  getItems,
  createItem,
  deleteItem,
}