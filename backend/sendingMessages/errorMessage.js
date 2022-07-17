const errorMessage = (message, event) => {
  const { connectionId: socketId } = event.requestContext;
  const apigw = require("./apigatewayInit")(event);

  return apigw
    .postToConnection({
      ConnectionId: socketId,
      Data: JSON.stringify({
        type: "error",
        message,
      }),
    })
    .promise();
};

module.exports = errorMessage;
