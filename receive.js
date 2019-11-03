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

    var queue1 = "outdoorQ";
    var queue2 = "indoorQ";

    channel.assertQueue(queue1, {
      durable: true
    });
    channel.assertQueue(queue2, {
      durable: false
    });

    console.log(
      "First consumer:\n" +
        " [*] Waiting for messages in %s and %ss. To exit press CTRL+C",
      queue1,
      queue2
    );

    channel.consume(
      queue1,
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        // channel.ack(msg);
      },
      {
        noAck: false
      }
    );

    channel.consume(
      queue2,
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        //  channel.ack(msg);
      },
      {
        noAck: false
      }
    );
  });
});
