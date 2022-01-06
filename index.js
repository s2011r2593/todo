const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const tdldb = require('./pg_stuff');

app.use(express.json());
app.use(cors({
  origin: 'blood-essential-loss-postgresql-headless.sean.svc.cluster.local',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
  tdldb.getItems();
});

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
