const express = require('express');

const app = express();
const port = 3001;
const tdldb = require('./pg_stuff');

var pgp = require('pg-promise')
var db = pgp('postgres://postgres:CrossoverDownAlbaniaSagamikoOhloneMericaFrankTomohiko@blood-essential-loss-postgresql-headless.sean.svc.cluster.local:5432/postgres');

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'blood-essential-loss-postgresql-headless.sean.svc.cluster.local');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
})

app.get('/', (req, res) => {
  db.one('CREATE TABLE tdl_items ( id SERIAL PRIMARY KEY, title VARCHAR(60), due TIMESTAMPTZ, complete boolean )')
});

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
