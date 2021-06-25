require('./config/mongoose.js')();
var mongoose = require('mongoose');
const Auth = mongoose.model('Auth');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
const Pkg = mongoose.model('Pkg');
const aedes = require('aedes')();
const port = 5871
const server = require('net').createServer(aedes.handle)
server.listen(port, function () {
    console.log('server started and listening on port ', port)
})
//信息验证
aedes.authenticate = function (client, username, password, callback) {
    Auth.findOne({ username, password },
        function (err, doc) {
            if (err) return console.error(err);
            if (doc)//存在该用户名与密码
            {
                callback(null,true)
            }
            else
            {
                callback(null, false)
            }
        });
}
//客户端连接
aedes.on('clientReady', (client)=>{
    console.log('Client Connected: ' + (client ? client.id : client));
    [username, udid] = client.id.split('-');
    User.findOne({name:username}, function (err, user) {
        const uid = user._id;
        Device.updateOne(
            {
                owner: uid,
                id: parseInt(udid)
            },
            {
                online: true
            }
        ).exec();
    })
});

// 客户端断开
aedes.on('clientDisconnect', (client)=>{
    console.log('Client Disconnected: ' + (client ? client.id : client));
    [username, udid] = client.id.split('-');
    User.findOne({ name: username }, function (err, user) {
        const uid = user._id;
        Device.updateOne({owner: uid,id: parseInt(udid)},{online: false}).exec();
    })
});

// 有消息发布
aedes.on('publish', (packet, client) => {
    console.log(packet.payload + '', client ? client.id : 'internal');
    //进行数据持久化
    if (client)
    {
        [username, udid] = client.id.split('-');
        User.findOne({ name: username }, function (err, user) {
            const uid = user._id;
            Device.findOne({ id: parseInt(udid), owner: uid, }, function (err, d) {
                const payload = JSON.parse(packet.payload + '');
                const did = d._id;
                const NEW_Pkg = new Pkg({
                    sender: did,
                    topic: packet.topic,
                    payload
                })
                NEW_Pkg.save();
                d.time = NEW_Pkg.createtime;
                d.markModified('time');
                const NEW_Pos = { type: 'Point', coordinates: payload.location };
                d.location.push(NEW_Pos);
                d.packages.push(NEW_Pkg._id);
                d.save();
            })
        })
    }
})

