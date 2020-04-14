const express = require("express");

const app = express();

app.listen(process.env.PORT, () =>
  console.log("server runnin on port ", process.env.PORT)
);
