var express = require('express');
var router = express.Router();
var cors = require('cors');
var Tip = require('../models/tip');

var originCors = process.env.ORIGIN_CORS || "http://localhost:4200";
var corsOptions = {
    origin: originCors,
    methods: "GET",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

router.get('/findByLang/:idLang/:in', cors(corsOptions), function(req, res, next) {
    var findParams = {};
    findParams['lang'] = req.params.idLang;
    var inLang = req.params.in.toLowerCase();
    findParams[inLang] = { $ne: null };
        
    var projection = {};
    projection['id'] = 1;
    projection[inLang] = 1;
    projection['_id'] = 0;

    Tip.find(findParams, projection, function(err, tips) {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            res.json(tips);
        }
    });
});

module.exports = router;