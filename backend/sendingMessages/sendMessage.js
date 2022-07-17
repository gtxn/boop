const sendMessage = (type, message, event) => {
  const { connectionId: socketId } = event.requestContext;
  const apigw = require("./apigatewayInit")(event);

  return apigw
    .postToConnection({
      ConnectionId: socketId,
      Data: JSON.stringify({
        type,
        message: message,
      }),
    })
    .promise();
};

module.exports = sendMessage;
