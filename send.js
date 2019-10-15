#!/usr/bin/env node

// DOC: https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var min=25; 
        var max=28;  
        var random  = Math.random() ;



        var queue = 'firstQ';
        var msg = random.toString();

        channel.assertQueue(queue, {
            durable: false
        });

        setInterval( () => {
            var random  =  Math.floor(Math.random() * (+max - +min)) + +min; 
            var msg = random.toString()+" °C from Outdoor";
            channel.sendToQueue(queue, Buffer.from(msg)); 
            console.log(" [x] Sent %s", msg);
        } 
        ,10000); 

     
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 600000);
    
});