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
            res.json([nd, np, ndata]);
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
        const udoc = await User.findOne({ email: token }).exec();
        if (udoc) {
            const uid = udoc._id;
            let chartdata = {
                "设备数": {
                    actualData: []
                },
                "数据包": {
                    actualData: []
                },
                "数据量": {
                    actualData: []
                }
            };
            (async () => {
                return Promise.all([...new Array(7).keys()]
                    .map(async (i) => {
                        const day = moment().add(i - 6, 'days')
                        const end = day.endOf('day');
                        const ds = await Device.find(
                            {
                                owner: uid, createtime: { '$lte': end }
                            })
                            .exec();
                        const np = await Pkg.countDocuments(
                            {
                                owner: uid, createtime: { '$lte': end }
                            })
                            .exec();
                        const nd = ds.length;
                        const ndata = ds.reduce((ndata, cur) => { return ndata + cur.data }, 0);
                        chartdata['设备数'].actualData.push(nd);
                        chartdata['数据包'].actualData.push(np);
                        chartdata['数据量'].actualData.push(ndata);
                    }))
            })().then(() => {
                res.status(200);
                res.json(chartdata);
            })
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

router.get('/pie', async function (req, res, next) {
    const token = req.get("Authorization");
    if (token) {
        const udoc = await User.findOne({ email: token }).exec();
        if (udoc) {
            const uid = udoc._id;
            const ds = await Device.find({ owner: uid }, '-_id name data')
                .sort({ data: 1 })
                .limit(5).exec();
            res.status(200);
            res.json(ds);
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
module.exports = router;