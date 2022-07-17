const putSocketRoomInfo = require("../dynamoDb/socketRoom/putSocketRoomInfo");

const connectionHandler = async (event) => {
  const { connectionId: socketId } = event.requestContext;

  if (!socketId) {
    return {
      statusCode: 500,
      body: "Missing connection id",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

exports.handler = connectionHandler;
