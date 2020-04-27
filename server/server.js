"use strict";
/********************************************/
/* variables                                */
/********************************************/
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const clarifaiRoutes = require("./routes/clarifai");

/********************************************/
/* Setup CORS                               */
/********************************************/
const whitelist = [process.env.WEBSITE];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

/********************************************/
/* Setup app                                */
/********************************************/
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(expressSanitizer());

/********************************************/
/* Mount all resource routes                */
/********************************************/
app.use("/api", usersRoutes(knex));
app.use("/api/clarifai", clarifaiRoutes(knex));

/********************************************/
/* run server                               */
/********************************************/
app.listen(PORT, () => console.log("server runnin on port ", PORT));
