const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false  --app offlinebudgetracker
mongoose.connect( process.env.url || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,  
  useUnifiedTopology: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});