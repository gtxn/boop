const getUsersInRoom = require("../dynamoDb/socketRoom/getUsersInRoom");

const sendToRoom = (roomNumber, type, message, event) => {
  const apigw = require("./apigatewayInit")(event);

  return getUsersInRoom(roomNumber).then((users) => {
    if (users.length == 0) {
      console.log("No users in room");
      return Promise.reject("Room does not exist.");
    }

    return Promise.all(
      users.map((user) => {
        return apigw
          .postToConnection({
            ConnectionId: user.socketId,
            Data: JSON.stringify({
              type,
              message,
            }),
          })
          .promise();
      })
    );
  });
};

module.exports = sendToRoom;
