const express = require('express');
const bodyParser = require('body-parser');

const app = express();


console.log('done');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Posted successfully!",
  });
})

app.get('/api', (req, res, next) => {
  res.status(200).json({
    message: "Gotten successfully!",
  });
});

module.exports = app;
