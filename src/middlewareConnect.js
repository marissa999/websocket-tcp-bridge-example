class MiddleWareConnect {
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

  constructor(
    middlewareHostname,
    middlewarePort,
    endPointHostname,
    endPointPort,
    receiveMessage
  ) {
    // init all properties
    this._socket;
    this._receiveMessage;
    this._settingsMiddleware;
    this._settingsEndpoint;

    this._settingsMiddleware = {
      hostname: null,
      port: null
    };

    this._settingsEndpoint = {
      hostname: null,
      port: null
    };

    this._receiveMessage = receiveMessage;

    // assign middleware settings
    this._settingsMiddleware.hostname = middlewareHostname;
    this._settingsMiddleware.port = middlewarePort;

    // assign endPoint settings
    this._settingsEndpoint.hostname = endPointHostname;
    this._settingsEndpoint.port = endPointPort;

    this._socket = io(
      this._settingsMiddleware.hostname + ":" + this._settingsMiddleware.port
    );

    this._socket.on("connect", () => {
      this._socket.emit("endPointInformation", this._settingsEndpoint);
    });

    // message received
    this._socket.on("data", data => {
      this._receiveMessage(data);
    });

    this._socket.on("disconnect", function() {
      console.log("disconnect now");
      this._socket = null;
    });
  }

  sendMessage(data) {
    this._socket.emit("sendData", data);
  }
}
