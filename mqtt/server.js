require('./config/mongoose.js')();
var mongoose = require('mongoose');
const Auth = mongoose.model('Auth');
const Device = mongoose.model('Device');
const User = mongoose.model('User');
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
aedes.on('clientReady', function (client) {
    console.log('Client Connected: ' + (client ? client.id : client));
    [username, did] = client.id.split('-');
    User.findOne({name:username}, function (err, user) {
        const uid = user._id;
        Device.updateOne(
            {
                owner: uid,
                id: parseInt(did)
            },
            {
                online: true
            }
        ).exec();
    })
});

// 客户端断开
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: ' + (client ? client.id : client));
    [username, did] = client.id.split('-');
    User.findOne({ name: username }, function (err, user) {
        const uid = user._id;
        Device.updateOne(
            {
                owner: uid,
                id: parseInt(did)
            },
            {
                online: false
            }
        ).exec();
    })
});

// 有消息发布
aedes.on('publish', (packet, client) => {
    console.log(packet, client?client.id:'internal');
    if(client) console.log(client.id);
})

