const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {

	a = JSON.parse(msg);
	console.log(a.res);



  // console.log(`server got: ${JSON.parse(msg)} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
  a = {
  	'tarea':1,
  	'n':1,
  	'm':20,
  	'k':100
  }

  server.send(Buffer.from(JSON.stringify(a)), 34542, '127.0.0.1', (err) => {
  	console.log(err);
  });

});


server.bind({
  address: '127.0.0.1',
  port: 34522,
  exclusive: true
});