const express = require('express');
const request = require('request');

//const servers = ['http://18.223.3.163:3333'];
const servers = ['http://18.223.3.163:3333','http://3.18.101.198:3333', 'http://18.223.97.44:3333' ];
let current = 0;
const port = 3333;

const handler = (req, res) => {
  //console.log(`server ${current}`, req.method, req.url, req.body);
  req.pipe(request({ url: servers[current] + req.url })).pipe(res);
  current = (current + 1) % servers.length;
};
const server = express().get('*', handler).post('*', handler).put('*', handler).delete('*', handler);

server.listen(3333, () => {
  console.log(`Load balancer on port ${port}`);
});
