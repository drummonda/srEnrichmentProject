const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require ('path')
const app = express();
module.exports = app;

// Logging middleware
app.use(volleyball);

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes that will be accessed via ajax
app.use('/api', require('./api'));

// Middleware for catching a file extension
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

// Send out index.html
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});
