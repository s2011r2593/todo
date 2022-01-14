const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const tdldb = require('./pg_stuff');

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/items', tdldb.getItems);
app.post('/items', tdldb.writeItem);
app.post('/delete', tdldb.deleteItem);

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
