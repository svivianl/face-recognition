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
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const clarifaiRoutes = require("./routes/clarifai");

/********************************************/
/* Setup app                                */
/********************************************/
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());

/********************************************/
/* Mount all resource routes                */
/********************************************/
app.use("/api", usersRoutes(knex));
app.use("/api/clarifai", clarifaiRoutes(knex));

/********************************************/
/* run server                               */
/********************************************/
app.listen(PORT, () => console.log("server runnin on port ", PORT));
