var mqtt = require("mqtt")

for (var i = 0; i < 13; i++)
{
    const client = mqtt.connect('mqtt://127.0.0.1:5871', {
        username: "test",
        password: "test",
        clientId: "test-6",
    }
    );

    client.on("connect", function () {
        console.log("服务器连接成功");
        console.log(client.options.clientId);
        const limit = Math.floor(Math.random() * 15);
        let cnt = 0;
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
            cnt++;
        }, 1000)
        if (cnt === limit) clearInterval(id);
        client.end(true);
    });
}
