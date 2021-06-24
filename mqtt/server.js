const mongoose = require('mongoose');
const MongoPersistence = require('aedes-persistence-mongodb');
const Aedes = require('aedes')
const mp = MongoPersistence({
    url: 'mongodb://localhost:27017/mqtt-test',
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 },
})
const aedes = new Aedes(
    { persistence: mp }
);
const port = 5871
const server = require('net').createServer(aedes.handle)
server.listen(port, function () {
    console.log('server started and listening on port ', port)
})

//客户端连接
aedes.on('client', function (client) {
    console.log('Client Connected: ' + (client ? client.id : client), 'to broker', aedes.id);
});

// 客户端断开
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: ' + (client ? client.id : client), 'to broker', aedes.id);
});

// 有消息发布
aedes.on('publish', (packet, client) => {
    console.log(packet.payload+'');
})

