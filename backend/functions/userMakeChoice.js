const userAddChoice = require("../dynamoDb/socketRoom/userAddChoice");
const getSocketInfo = require("../dynamoDb/socketRoom/getSocketInfo");
const sendToRoom = require("../sendingMessages/sendToRoom");
const sendMessage = require("../sendingMessages/sendMessage");
const errorMessage = require("../sendingMessages/errorMessage");
const getDecidedInRoom = require("../utils/getDecidedInRoom");

const userMakeChoice = (event) => {
  const { choices } = JSON.parse(event.body).data;
  const { connectionId: socketId } = event.requestContext;

  if (socketId == undefined || choices == undefined) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        data: "Missing required fields. SocketId and choice are required fields",
      }),
    };
  }

  return userAddChoice(socketId, choices)
    .then(() => getSocketInfo(socketId))
    .then((socketInfo) =>
      Promise.all([getDecidedInRoom(socketInfo.roomNumber), socketInfo])
    )
    .then(([decidedUsers, socketInfo]) =>
      Promise.all([
        sendToRoom(
          socketInfo.roomNumber,
          "userMakeChoice",
          {
            username: socketInfo.username,
            choices,
            decidedUsers,
          },
          event
        ),
        decidedUsers,
      ])
    )
    .then(([_, decidedUsers]) =>
      sendMessage("myChoiceMade", { choices, decidedUsers }, event)
    )
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: "User created",
      }),
    }))
    .catch((e) => {
      console.log("error", e);
      return errorMessage(e, event).then((e) => ({
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          data: "Send message failed",
        }),
      }));
    });
};

exports.handler = userMakeChoice;
