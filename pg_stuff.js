const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'blood-essential-loss-postgresql-headless.sean.svc.cluster.local',
  database: 'postgres',
  password: 'CrossoverDownAlbaniaSagamikoOhloneMericaFrankTomohiko',
  port: 5432,
});

const createTable = () => {
  pool.query('CREATE TABLE tdl ( id SERIAL PRIMARY KEY, title VARCHAR(60), due TIMESTAMPTZ, complete, boolean )', (err, res) => {
    console.log(err, res);
    pool.end();
  });
}

module.exports = {
  createTable
}