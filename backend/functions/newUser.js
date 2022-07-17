const putSocketRoomInfo = require("../dynamoDb/socketRoom/putSocketRoomInfo");
const getRoomInfo = require("../dynamoDb/roomInfo/getRoomInfo");
const errorMessage = require("../sendingMessages/errorMessage");
const sendMessage = require("../sendingMessages/sendMessage");
const sendToRoom = require("../sendingMessages/sendToRoom");

const newUser = (event) => {
  const { username, roomNumber } = JSON.parse(event.body).data;
  const { connectionId: socketId } = event.requestContext;

  return sendToRoom(roomNumber, "newUser", { username }, event)
    .then(() => putSocketRoomInfo(socketId, roomNumber, username, false))
    .then(() => getRoomInfo(roomNumber))
    .then((roomInfo) => {
      console.log("Room info:", roomInfo);
      return sendMessage("roomInfo", roomInfo, event);
    })
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: "User created",
      }),
    }))
    .catch((err) => errorMessage(err, event));
  // .then(() => ({
  //   statusCode: 500,
  //   body: JSON.stringify({
  //     success: false,
  //     data: "User creation failed",
  //   }),
  // }));
};

exports.handler = newUser;
