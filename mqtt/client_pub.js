var mqtt = require("mqtt")
let cnt = 0;
const client = mqtt.connect('mqtt://127.0.0.1:5871', {
    username: "test",
    password: "test",
    clientId: "test-" + process.argv[2],
}
);
client.on("connect", () => {
    console.log("服务器连接成功");
    const limit = Math.floor(Math.random() * 15) + 1;
    console.log(client.options.clientId + '要发' + limit + '个包');
    const id = setInterval(() => {
        client.publish("test",
            JSON.stringify({
                warning: false,
                location: [
                    parseInt(Math.random() * 10 + 115, 10),
                    parseInt(Math.random() * 10 + 25, 10)
                ],
                data: "tmp data",
            })
        );
        console.log('send!');
        cnt++;
        if (cnt === limit) {
            clearInterval(id);
            client.end(true);
        }
    }, 100);
});

