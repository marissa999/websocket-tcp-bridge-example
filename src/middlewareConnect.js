class MiddleWareConnect{

	/* properties:
		this.socket;
		this.sendMessage;
		this.settingsMiddleware = {
			'hostname': null,
			'port': null,
		};
		this.settingsEndpoint = {
			'hostname': null,
			'port': null,
		};
	*/

	constructor(middlewareHostname, middlewarePort, endPointHostname, endPointPort, receiveMessage){
		// init all properties
		this._socket;
		this._receiveMessage;
		this._settingsMiddleware;
		this._settingsEndpoint;

		this._settingsMiddleware = {
			'hostname': null,
			'port': null,
		};

		this._settingsEndpoint = {
			'hostname': null,
			'port': null,
		};

		this._receiveMessage = receiveMessage;

		// assign middleware settings
		this._settingsMiddleware.hostname = middlewareHostname;
		this._settingsMiddleware.port = middlewarePort;

		// assign endPoint settings
		this._settingsEndpoint.hostname = endPointHostname;
		this._settingsEndpoint.port = endPointPort;

		// print for debug
		console.log(`Middleware settings:\n\r${JSON.stringify(this._settingsMiddleware, null, 2)}`);
		console.log(`Endpoint settings:\n\r${JSON.stringify(this._settingsEndpoint, null, 2)}`);

		this._socket = io(this._settingsMiddleware.hostname + ':' + this._settingsMiddleware.port);

		this._socket.on('connect', () => {
			this._socket.emit('endPointInformation', this._settingsEndpoint);
		});

		// message received
		this._socket.on('data', (data) => {
			this._receiveMessage(data);
		});

		this._socket.on('disconnect', function(){
			console.log("disconnect now");
			this._socket.close();
		});
	}

	sendMessage(data){
		console.log(`send:\n\r${JSON.stringify(data, null, 2)}`);
		this._socket.emit('sendData', data);
	}
}