var mqtt = require("mqtt")
var client = mqtt.connect("mqtt://localhost:5871")

// 连接后订阅temp topic
client.on('connect', (e) => {
    console.log("success connect mqtt server");
    client.subscribe('temp', function (err) {
        console.log("subscribe temp topic")
    })
})

// 监听订阅的message
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic + ":\t" + message.toString())
})