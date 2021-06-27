const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
const Pkg = mongoose.model('Pkg');
router.get('/', async function (req, res, next) {
    const token = req.user.email;
    if (token) {
        const name = req.query.name;
        const online = req.query.status === 'online' ? true : false;
        const start = req.query.start;
        const end = req.query.end;
        const udoc = await User.findOne({ email: token }).exec();
        if (udoc)
        {
            const uid = udoc._id;
            let filter = { owner: uid };
            if (name) {
                filter.name = name;
            }
            if (req.query.status) {
                filter.online = online;
            }
            const ds = await Device.find(filter, 'id name data time location online packages').sort({ id: 1 }).exec();
            const pageList = ds.slice(start, end);
            (async () => {
                for (const index in pageList) {
                    const d = pageList[index];
                    const pid = d.packages[d.packages.length - 1];
                    const pkg = await Pkg.findById(pid).exec();
                    pageList[index] = {
                        id: d.id,
                        name: d.name,
                        data: d.data,
                        time: d.time,
                        location: d.location,
                        online:d.online,
                        text:pkg?pkg.payload.data:null,
                    };
                }
            })().then(() => {
                console.log(pageList);
                const body = {
                    total: ds.length,
                    items: pageList,
                };
                // console.log(body);
                res.status(200);
                // console.log('send!');
                res.json(body);
            }
            )
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

router.post('/', async function (req, res, next) {
    const token = req.user.email;
    const addname = req.body.addname;
    console.log(req.body)
    if (token) {
        const doc = await User.findOne({ email: token }).exec();
        if (doc) {
            const uid = doc._id;
            const ds = await Device.find({ owner: uid }).sort({ id: 1 }).exec();
            console.log(ds);
            let cnt = ds.length;
            for (const index in ds)
            {
                if (ds[index].id != index)
                {
                    console.log(ds[index].id);
                    console.log(index);
                    cnt = index;
                    break;
                }
            }
            console.log(cnt);
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