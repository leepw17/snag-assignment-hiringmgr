const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log("Connected to database " + config.database);
});
mongoose.connection.on('error', (err) => {
  console.log("Database error " + err);
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Api Routers
const questions = require('./routes/question');
app.use('/api/question', questions);
const applications = require('./routes/application');
app.use('/api/application', applications);

// Angular DIST output folder
//app.use(express.static(path.join(__dirname, 'dist/snag-assignment')));
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'dist/snag-assignment/index.html'));
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log("Server started on port " + port);
})
