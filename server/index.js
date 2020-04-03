const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const PORT = process.env.PORT || 5003;
const environment = process.env.NODE_ENV || "dev";
const keys = require("./config/keys");
const app = express();

require("./models/User");
require("./models/Job");
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

app.use(
  cors({
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.options(
  "*",
  cors({
    methods: ["GET", "POST"],
    credentials: true
  })
); // include before other routes
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

if (environment === "dev") {
  console.log(
    "\x1b[31m",
    "ENVIRONMENT IS DEV - ENSURE THAT THIS IS NOT SHOWING WHEN DEPLOYED",
    "\x1b[0m"
  );
} else if (environment === "production") {
  console.log("\x1b[34m", "RUNNING IN PRODUCTION", "\x1b[0m");
  app.use(express.static("client/build")); // make sure express serves production assets
  // make sure express serves index.html if it doesn't know the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
