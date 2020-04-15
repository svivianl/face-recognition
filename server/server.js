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
const bodyParser = require("body-parser");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

/********************************************/
/* Setup app                                */
/********************************************/
app.use(cors());
app.use(bodyParser.json());

/********************************************/
/* Mount all resource routes                */
/********************************************/
app.use("/api/", usersRoutes(knex));

/********************************************/
/* run server                               */
/********************************************/
app.listen(PORT, () => console.log("server runnin on port ", PORT));
