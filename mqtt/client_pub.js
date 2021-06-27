var mqtt = require("mqtt")
let cnt = 0;
const id = process.argv[2];
const always = process.argv[3] === 'always'?true: false;
const client = mqtt.connect('mqtt://127.0.0.1:5871', {
    username: "Ambrum",
    password: "BSdeathwing2012",
    clientId: "Ambrum-" + process.argv[2],
}
);
client.on("connect", () => {
    console.log("服务器连接成功");
    // const limit = Math.floor(Math.random() * 15) + 1;
    const limit = 20;
    if (!always)
    {
        console.log(client.options.clientId + '要发' + limit + '个包');
    }
    else
    {
        console.log(client.options.clientId + '持久在线');
    }
    const id = setInterval(() => {
        client.publish("test",
            JSON.stringify({
                warning: cnt%2===0?true:false,
                location: [
                    Math.random() + 119.5,
                    Math.random() + 30.5,
                ],
                data: 'data'+ cnt+ 'of' + client.options.clientId
            })
        );
        console.log('send!');
        cnt++;
        if ((!always)&&cnt === limit) {
            clearInterval(id);
            client.end(true);
        }
    }, always?5000:500);
});

