'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const getItems = require('./queries/getItems');
const addItem = require('./commands/addItem');
const markItemAsPurchased = require('./commands/markItemAsPurchased');

// Constants
const PORT = process.env.PORT;
const HOST = '0.0.0.0';

// App
const app = express();
const jsonParser = bodyParser.json()

app.get('/items', (req, res) => {
  getItems().then(items => res.json(items));
});

app.post('/items', jsonParser, (req, res) => {
  addItem(req.body.name).then(data => res.json(data));
});

app.put('/items/:id/purchased', (req, res) => {
  markItemAsPurchased(req.params.id).then(() => res.status(202).send());
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
