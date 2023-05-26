const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

async function handlePrice(id, curr) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${curr}`);
  const data = await response.json();
  return data;
}

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('priceRequest', async (requestData) => {
    const { id, currency } = requestData;
    let data = await handlePrice(id, currency);
    socket.emit('priceResponse', data);
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});