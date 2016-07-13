'use strict'

const dgram = require('dgram');
// var a = JSON.stringify([[1,2]])
// const message = Buffer.from(a);
const client = dgram.createSocket('udp4');


client.on('message', (msg, info) => {

	console.log(JSON.parse(msg));



	var message = JSON.parse(msg);
	switch(message.tarea) {

		// Crear el array n,m,k; filtrando
		case 1:

			var n = message.n;
			var m = message.m;
			var k = message.k;

			var res = {res: fa(n, m, k)};

			console.log(res);

			client.send(Buffer.from(JSON.stringify(res)), 34522, '0.0.0.0', (err) => {
			  client.close();				
			});

		break;

		default:
		break;

	}

});

client.on('listening', () => {
	var address = client.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

client.bind({
  // address: '127.0.0.1',
  port: 34542,
  exclusive: true
});


// client.send(message, 34542, '0.0.0.0', (err) => {
//   client.close();
// });


const buscarRepetidos = (elem, index, array) => {
	for (var i = index - 1; i >= 0; i--){
		if (elem[0]/elem[1] == array[i][0]/array[i][1]) {
			return true;
		}
	}
	return false;

};

const fa = (n, m, k) => {

	var array = [];
	var arrayB = [];

	for (var i = n ; i <= m; i++) {		
		for (var j = 1; j <= k; j++) {
			array.push([j, i]);
		}
	}

	array = array
		.filter( (a) => a[0]/a[1] < 1)
		.sort( (a,b) => ( (a[0]/a[1]) - (b[0]/b[1]) ));
	
	return array;
};

// fa(1,200,200);
