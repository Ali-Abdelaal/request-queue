# requests-queue

1- USE ZeroMQ as a message queue
https://github.com/JustinTulloss/zeromq.node

before install zeromq by npm you should install
- node-gyp
https://github.com/nodejs/node-gyp

then also need install
on windows 
- should install vs and install c++ language
- install npm install --global --production windows-build-tools from an elevated PowerShell(x32) or CMD.exe (run as Administrator).

others OS see https://github.com/nodejs/node-gyp

- install ZeroMQ-4.0.4-miru1.0-x64.exe
get it from http://zeromq.org/

finally npm install zmq

2- USE RabbitMQ as a message queue
https://github.com/squaremo/amqp.node
http://www.rabbitmq.com/

install otp_win64_19.2.exe and rabbitmq-server-3.6.6.exe