const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'blood-essential-loss-postgresql-headless.sean.svc.cluster.local',
  database: 'tododb',
  password: process.env.DB_PASSWORD,
  port: '5432',
});

const writeItem = (request, response) => {
  const { title, due, complete } = request.body;

  pool.query('INSERT INTO tdl_items (title, due, complete) VALUES ($1, $2, $3)', [title, due, complete], (error, results) => {
    if (error){
      throw error;
    }
    response.status(201).send(`Item added with ID: ${result.insertId}`);
  });
}

const getItems = (request, response) => {
  pool.query('SELECT * FROM tdl_items', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
}

module.exports = {
  writeItem,
  getItems,
}