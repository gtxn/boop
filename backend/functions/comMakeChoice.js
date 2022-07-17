const getSocketInfo = require("../dynamoDb/socketRoom/getSocketInfo");
const getUsersInRoom = require("../dynamoDb/socketRoom/getUsersInRoom");
const sendMessage = require("../sendingMessages/sendMessage");
const sendToRoom = require("../sendingMessages/sendToRoom");

const comMakeChoice = (event) => {
  const { connectionId: socketId } = event.requestContext;

  return getSocketInfo(socketId)
    .then((socketInfo) =>
      Promise.all([getUsersInRoom(socketInfo.roomNumber), socketInfo])
    )
    .then(([users, { roomNumber }]) => {
      const choices = users.map((user) => JSON.parse(user.choice)).flat();
      const finChoice = choices[Math.floor(Math.random() * choices.length)];
      console.log("final choice", finChoice);

      return sendToRoom(
        roomNumber,
        "comMakeChoice",
        { choice: finChoice },
        event
      );
    })
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully made choice",
      }),
    }))
    .catch((err) => {
      console.log(err);
      return sendMessage("error", err, event).then(() => ({
        statusCode: 500,
        body: JSON.stringify({
          message: "Error making choice",
        }),
      }));
    });
};

exports.handler = comMakeChoice;
