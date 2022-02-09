const PORT = process.env.PORT || 3000;

const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cors = require('cors')

var services = require('./services/Services.js');
const { readLogs } = require('./logger')

var app = (module.exports = express());
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

app.get("/v1/nsh_external_pricing/logs", function (req, res) {
  return readLogs(req, res)
});

app.post("/v1/nsh_external_pricing/status", function (req, res) {
  res.status(200).json({ "status": "OK. Running version 0.6.3" });
  return;
});

app.post("/v1/nsh_external_pricing/listprices", function (req, res) {
  services.listPrice(req, res);
  return;
});

app.post("/v1/nsh_external_pricing/calculateprice", function (req, res) {
  services.calculatePrice(req, res);
  return;
});

app.post("/v1/nsh_external_pricing/validateprices", function (req, res) {
  services.validatePrice(req, res);
  return;
});

/* app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
}); */