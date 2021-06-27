const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
router.get('/', function (req, res, next) {
    const token = req.user.email;
    if (token) {
        const name = req.query.name;
        const online = req.query.status === 'online' ? true : false;
        const start = req.query.start;
        const end = req.query.end;
        User.findOne({ email: token }, function (err, doc) {
            if (doc)
            {
                const uid = doc._id;
                let filter = { owner: uid };
                if (name) {
                    filter.name = name;
                }
                if (req.query.status) {
                    filter.online = online;
                }
                Device.find(filter, 'id name data time location online')
                    .sort({ id: 1 })
                    .exec(function (err, docs) {
                        if (err) return console.error(err);
                        const pageList = docs.slice(start, end);
                        console.log(pageList[0]);
                        const body = {
                            total: docs.length,
                            items: pageList,
                        };
                        res.status(200);
                        res.json(body);
                    })
            }
            else {
                res.status(401);
                res.json({ message: "获取用户信息失败" });
            }
        })
    }
    else {
        res.status(401);
        res.json({ message: "获取token信息失败" });
    }

});

router.post('/', function (req, res, next) {
    const token = req.user.email;
    const addname = req.body.addname;
    console.log(req.body)
    if (token) {
        User.findOne({ email: token }, function (err, doc) {
            if (doc) {
                const uid = doc._id;
                Device.countDocuments({ owner: uid }, function (err, cnt) {
                    const TEST_Device = new Device({
                        id: cnt,
                        owner: uid,
                        name: addname,
                        online: false,
                        data: 0,
                    })
                    TEST_Device.markModified('time')
                    TEST_Device.save()
                    res.status(201);
                    res.send();
                })
            }
            else {
                res.status(401);
                res.json({ message: "获取用户信息失败" });
            }
        })
    }
    else {
        res.status(401);
        res.json({ message: "获取token信息失败" });
    }

});

router.put('/', async (req, res, next) => {
    const token = req.user.email;
    const editdata = req.body;
    console.log(req.body)
    if (token) {
        const udoc = await User.findOne({ email: token })
        if (udoc) {
            const uid = udoc._id;
            const _ = await Device.updateOne({ owner: uid, id: editdata.id },
                { name: editdata.name, online: editdata.status === 'online' ? true : false }).exec();
            res.status(201);
            res.send();
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

router.delete('/', async (req, res, next) => {
    const token = req.user.email;
    const editdata = req.body;
    console.log(req.body)
    if (token) {
        const udoc = await User.findOne({ email: token })
        if (udoc) {
            const uid = udoc._id;
            const d = await Device.findOneAndDelete({ owner: uid, id: editdata.id }).exec();
            const did = d._id;
            //等待添加包的信息，需要一并删除
            res.status(204);
            res.send();
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