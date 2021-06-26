const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
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
            const ds = await Device
                .find({ owner: uid }, '-_id name location warning packages')
                .sort({ data: -1 })
                .limit(5)
                .exec();
            const dms = [];
            for (const d of ds)
            {
                let texts = [];
                for (const pid of d.packages.slice(-10))
                {
                    const pkg = await Pkg
                        .findById(pid)
                        .exec();
                    texts.push(pkg.payload.data)
                }
                dms.push({
                    name: d.name,
                    location: d.location,
                    warning: d.warning,
                    text:texts,
                })
            }
            // const dms = ds.map(function(d){
            //     return{
            //         name: d.name,
            //         location: d.location,
            //         warning: d.warning,
            //     }
            // })
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