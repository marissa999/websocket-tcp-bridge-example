let connection;

document.getElementById("settingsForm").addEventListener(
  "submit",
  event => {
    event.preventDefault();

    const middlewareHostname = document.getElementById(
      "settingsMiddlewareHostname"
    ).value;
    const middlewarePort = document.getElementById("settingsMiddlewarePort")
      .value;
    const endpointHostname = document.getElementById("settingsEndpointHostname")
      .value;
    const endpointPort = document.getElementById("settingsEndpointPort").value;

    // if a field is empty do nothing
    if (
      !middlewareHostname ||
      !middlewarePort ||
      !endpointHostname ||
      !endpointPort
    ) {
      console.log("At least one field is not defined!");
      return;
    }

    // connect to server
    connection = new MiddleWareConnect(
      middlewareHostname,
      middlewarePort,
      endpointHostname,
      endpointPort,
      data => {
        addMessageToLog("server", data);
      }
    );
  },
  true
);

document.getElementById("connectionForm").addEventListener(
  "submit",
  event => {
    event.preventDefault();
    const data = document.getElementById("sendMessageText").value + "\r\n";
    connection.sendMessage(data);
    addMessageToLog("client", data);
  },
  true
);

function addMessageToLog(from, message) {
  const textLog = document.getElementById("logs");
  const d = new Date();
  const hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  const mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const ss = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  textLog.value += `${hh}:${mm}:${ss} - ${from}: ${message}\r\n`;
  textLog.scrollTop = textLog.scrollHeight;
}
