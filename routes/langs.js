var express = require('express');
var router = express.Router();
var cors = require('cors');
var Lang = require('../models/lang');

var originCors = process.env.ORIGIN_CORS || "http://localhost:4200";
var corsOptions = {
    origin: originCors,
    methods: "GET",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

router.get('/', cors(corsOptions), function(req, res, next) {
  Lang.find(function(err, lang) {
    if (err)
      res.send(err);
    res.json(lang);
  });
});

module.exports = router;