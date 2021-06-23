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
    Device.find({},
        function (err, docs) {
            if (err) return console.error(err);
            let mockList = List.filter((item) => {
                if (status && item.status !== status) return false;
                if (name && item.name.indexOf(name) < 0) return false;
                return true;
            });
            let pageList = mockList.slice(start, end);
            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList,
                },
            };
            res.json(docs[0]);
        });
});
module.exports = router;