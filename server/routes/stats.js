var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
const Pkg = mongoose.model('Pkg');
router.get('/number', async function (req, res, next) {
    const token = req.get("Authorization");
    if (token) {
        const udoc = await User.findOne({ email: token }).exec();
        if (udoc) {
            const uid = udoc._id;
            const ds = await Device.find({ owner: uid }).exec();
            const np = await Pkg.countDocuments({ owner: uid }).exec();
            const nd = ds.length;
            const ndata = ds.reduce((ndata, cur) => { return ndata + cur.data }, 0);
            res.status(200);
            res.json([ nd, np, ndata ]);
        }
        else {
            res.status(401);
            res.json({ message: "获取用户信息失败" });
        }
    }
    else {
        res.status(401);
        res.json({ message: "获取token信息失败" });
    }

});

router.get('/week', async function (req, res, next) {
    const token = req.get("Authorization");
    if (token) {
        // const udoc = await Pkg
        //     .findOne({})
        //     .populate({
        //         path: 'sender',
        //         populate:{path:'owner'}
        //     })
        //     .exec();
        if (udoc) {
            const uid = udoc._id;
            [...new Array(7).keys()].map(async (i) => {
                const day = moment().add(i - 6, 'days')
                // start today
                const start = day.startOf('day');
                // end today
                const end = day.endOf('day');
                const ds = await Device.find(
                    {
                        owner: uid, createtime: { '$gte': start, '$lte': end }
                    })
                    .exec();
                for (const device of ds) {
                    np += device.packages.length;
                    ndata += device.data;
                }
                const ps = await Pkg.countDocuments(
                    {
                        owner: uid, createtime: { '$gte': start, '$lte': end }
                    })
                    .exec();
            })
            res.status(200);
            res.json([nd, np, ndata]);
        }
        else {
            res.status(401);
            res.json({ message: "获取用户信息失败" });
        }
        res.json(udoc);
    }
    else {
        res.status(401);
        res.json({ message: "获取token信息失败" });
    }

});
module.exports = router;