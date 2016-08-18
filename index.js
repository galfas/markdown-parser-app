'use strict'

const Hapi = require('hapi');
const Good = require('good')

//Create a server with a host and port
const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 8000
})

//Add the route
server.route({
	method: 'GET',
	path:'/hello',
	handler: function(request, reply){
		return reply('hello world');
	}
})

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function (request, reply){
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
});

server.register({
	register: Good,
	options:{
		reporters:{
			console:[{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{
					response:'*',
					log:'*'
				}]
			},{
				module:'good-console'
			}, 'stdout']
		}
	}
}, (err) => {
	if(err) {
		throw err;
	}

	server.start((err) => {

		if (err) {
			throw err;
		}

		server.log('Server running at:', server.info.uri);
	})
})