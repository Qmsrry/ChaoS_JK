var mqtt = require("mqtt")
// 连接后不断发布temp topic
const client = mqtt.connect('mqtt://127.0.0.1:5871', {
    username: "test",
    password: "test",
    clientId: "test-6",
}
);

client.on("connect", function () {
    console.log("服务器连接成功");
    console.log(client.options.clientId);
    setInterval(() => {
        client.publish("test",
            JSON.stringify({
                warning: false,
                location: [
                    parseInt(Math.random() * 10 + 115, 10),
                    parseInt(Math.random() * 10 + 25, 10)
                ],
                data: "tmp data",
            })
        ); // 发布主题text消息
        console.log("SEND!");
    }, 2000)

});