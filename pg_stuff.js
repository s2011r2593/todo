const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: '5432',
});

const writeItem = (request, response) => {
  const { title, due, complete } = request.body;

  pool.query('INSERT INTO items (title, due, complete) VALUES ($1,  $2, $3)', [title, due, complete], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Item added with ID: ${results.insertId}`);
  });
}

const getItems = (request, response) => {
  pool.query('SELECT * FROM items', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
}

const deleteItem = (request, response) => {
  const { id } = request.body;
  pool.query('DELETE FROM items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Deleted item with ID ${id}`);
  })
}

module.exports = {
  writeItem,
  getItems,
  deleteItem,
}