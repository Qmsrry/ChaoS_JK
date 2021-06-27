const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
const Pkg = mongoose.model('Pkg');
router.get('/number', async function (req, res, next) {
    const token = req.user.email;
    console.log(token);
    if (token) {
        const udoc = await User.findOne({
            email: token
        }).exec();
        console.log(udoc.name);
        if (udoc) {
            const uid = udoc._id;
            const ds = await Device.find({
                owner: uid
            }).exec();
            console.log(ds);
            const np = await Pkg.countDocuments({
                owner: uid
            }).exec();
            const nd = ds.length;
            const ndata = ds.reduce((ndata, cur) => {
                return ndata + cur.data
            }, 0);
            res.status(200);
            res.json([nd, np, ndata]);
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

router.get('/week', async function (req, res, next) {
    const token = req.user.email;
    if (token) {
        const udoc = await User.findOne({
            email: token
        }).exec();
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
                            const start = day.clone().startOf('day');
                            const end = day.clone().endOf('day');
                            const nd = await Device.countDocuments({
                                owner: uid,
                                createtime: {
                                    '$gte':start,
                                    '$lte': end
                                }
                            }).exec();
                            const ps = await Pkg.find({
                                owner: uid,
                                createtime: {
                                    '$gte': start,
                                    '$lte': end
                                }
                            }).exec();
                            const np = ps.length;
                            const ndata = ps.reduce((ndata, cur) => {
                                console.log(cur);
                                return ndata + (new TextEncoder().encode(JSON.stringify(cur.payload)).length);
                            }, 0);
                            chartdata['设备数'].actualData[i] = (nd);
                            chartdata['数据包'].actualData[i] = (np);
                            chartdata['数据量'].actualData[i] = (ndata);
                        })
                )
            })().then(() => {
                res.status(200);
                res.json(chartdata);
            })
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

router.get('/bar', async function (req, res, next) {
    const token = req.user.email;
    if (token) {
        const udoc = await User.findOne({
            email: token
        }).exec();
        if (udoc) {
            const uid = udoc._id;
            const ds = await Device.find({
                owner: uid
            }, '-_id name data')
                .sort({
                    data: -1
                })
                .limit(5).exec();
            res.status(200);
            res.json(ds);
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

router.get('/pie', async function (req, res, next) {
    const token = req.user.email;
    if (token) {
        const udoc = await User.findOne({
            email: token
        }).exec();
        if (udoc) {
            const uid = udoc._id;
            const online = await Device.countDocuments({
                owner: uid,
                online: true
            }).exec();
            const offline = await Device.countDocuments({
                owner: uid,
                online: false
            }).exec();
            res.status(200);
            res.json([{
                name: '在线',
                value: online
            }, {
                name: '离线',
                value: offline
            }]);
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