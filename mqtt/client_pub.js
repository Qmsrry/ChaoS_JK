var mqtt = require("mqtt")
// 连接后不断发布temp topic
const client = mqtt.connect('mqtt://127.0.0.1:5871', {
    username: "test",
    password: "test",
    clientId: "test-10",}
);

client.on("connect", function () {
    console.log("服务器连接成功");
    console.log(client.options.clientId);
    setInterval(() => {
        client.publish("text", JSON.stringify({ id: 1 }), { qos: 0, retain: true }); // 发布主题text消息
    }, 2000)
    
});