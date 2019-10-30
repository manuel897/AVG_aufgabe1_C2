# RabbitMQ

> **TUTORIAL** https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html <br>
> **INSTALL** https://www.rabbitmq.com/install-windows-manual.html#set-erlang-home-variable


# Starting server

1. Start server by running **rabbitmq-server.bat** from "...\RabbitMQ\rabbitmq_server-3.8.0\sbin"
2. ( Node js shold be installed ) Run scripts send, send2 and recieve.

```CMD 

(from the dir where the .js files are located)

node send.js
node send2.js
node receive.js
node receive2.js

```
# Szenario

* Zwei Sensoren send(Outdoor) und send2(Indoor).
* Zwei Consumer receive und receive2. 
* send schickt Temperaturen an 'outdoorQ' und ist persistent nach neustart von rabbitMQ server.
* send2 schickt Temperaturen an 'indoorQ' und ist **nicht** persistent.
* receive und receive2 erhalten Nachrichten von 'outdoorQ' und 'indoorQ'.
    
