#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue1 = 'firstQ';
        var queue2 = 'secondQ';

        channel.assertQueue(queue1, {
            durable: false
        });
        channel.assertQueue(queue2, {
            durable: false
        }); 

        console.log("Second consumer:\n"+" [*] Waiting for messages in %s and %ss. To exit press CTRL+C", queue1 , queue2);
        
        channel.consume(queue1, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
           // channel.ack(msg);
        }, {
            
            noAck: false
        });

        channel.consume(queue2, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
          //  channel.ack(msg);
        }, {
            noAck: false
        }); 
    });
});