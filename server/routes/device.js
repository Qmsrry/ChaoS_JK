var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
/* Get username & passwod, Return the token */
router.get('/', function (req, res, next) {
    const token = req.get("Authorization");
    if (token)
    {
        const name = req.query.name;
        const online = req.query.status === 'online' ? true : false;
        const start = req.query.start;
        const end = req.query.end;
        User.findOne({ email: token }, function (err, doc) {
            const uid = doc._id;
            let filter = {owner:uid};
            if (name) {
                filter.name = name;
            }
            if (req.query.status) {
                filter.online = online;
            }
            Device.find(filter,'id name data time location online',
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
        })
    }
    else
    {
        res.json({ status: 1, message: "获取用户信息失败" });
    }
    
});
module.exports = router;