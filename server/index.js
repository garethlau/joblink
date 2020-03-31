const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors');

const PORT = process.env.PORT || 5003;
const environment = process.env.NODE_ENV || "dev";
const keys = require("./config/keys");
const app = express();

require("./models/User");
require("./services/passport");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  bodyParser.json({
    limit: "500mb"
  })
);
app.use(
  session({
    secret: "secretcat"
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())
app.options('*', cors()) // include before other routes


mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    keepAlive: 1,
    reconnectTries: 30
  })
  .then(() => {
    console.log("Successfully connected to mongo.");
  })
  .catch(err => {
    console.log("Error connecting to mongo.", err);
  });

app.use(require("./routes"));

app.listen(PORT);
