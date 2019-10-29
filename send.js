#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(error0, connection) {
  if (error0) {
    console.log("Fehler bei Verbindung zu RabbitMQ server");
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var min = 25;
    var max = 28;
    var queue = "outdoorQ";

    channel.assertQueue(queue, {
      durable: true
    });

    setInterval(() => {
      var random = Math.floor(Math.random() * (+max - +min)) + +min;
      var msg = random.toString() + " °C from Outdoor";
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      });
      console.log(" [x] Sent %s", msg);
    }, 10000);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 600000);
});
