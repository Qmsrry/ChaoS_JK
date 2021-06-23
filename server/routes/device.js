var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Device = mongoose.model('Device');

/* Get username & passwod, Return the token */
router.get('/', function (req, res, next) {
    const name = req.query.name;
    const online = req.query.status === 'online' ? true : false;
    const start = req.query.start;
    const end = req.query.end;
    let filter = {};
    if (name) {
        filter.name = name;
    }
    if (online) {
        filter.online = online;
    }
    Device.find(filter,
        function (err, docs) {
            if (err) return console.error(err);
            const pageList = docs.slice(start, end);
            const body = {
                code: 20000,
                data: {
                    total: docs.length,
                    items: pageList,
                },
            };
            res.json(body);
        });
});
module.exports = router;