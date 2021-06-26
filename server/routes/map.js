var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
const Pkg = mongoose.model('Pkg');
router.get('/', async function (req, res, next) {
    const token = req.get("Authorization");
    if (token) {
        const udoc = await User.findOne({
            email: token
        }).exec();
        if (udoc) {
            const uid = udoc._id;
            const ds = await Device.find({
                owner: uid
            }, '-_id name location warning')
                .sort({
                    data: -1
                })
                .limit(5).exec();
            const dms = ds.map(d => {
                return {
                    name: d.name,
                    location: d.location,
                    warning:d.warning,
                }
            })
            res.status(200);
            res.json(dms);
        } else {
            res.status(401);
            res.json({
                message: "获取用户信息失败"
            });
        }
    } else {
        res.status(401);
        res.json({
            message: "获取token信息失败"
        });
    }

});
module.exports = router;