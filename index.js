/** @format */

const express = require('express');
const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log('访问了');
});

io.on('connection', (socket) => {
  //接收前台传来的消息
  socket.on('send', (msg) => {
    console.log(msg);
    //将该条消息发送至前台所有人都能看见
    io.emit('allPerson', msg);
  });
});

//加载files文件资源
app.use(express.static('files'));

http.listen('3001', () => {
  console.log('访问了端口');
});
