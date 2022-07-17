const sendToRoom = require("../sendingMessages/sendToRoom");
const getUsersInRoom = require("../dynamoDb/socketRoom/getUsersInRoom");
const deleteSocketRoomInfo = require("../dynamoDb/socketRoom/deleteSocketRoomInfo");
const getSocketInfo = require("../dynamoDb/socketRoom/getSocketInfo");
const deleteRoom = require("../dynamoDb/roomInfo/deleteRoom");

const disconnectionHandler = async (event) => {
  const { connectionId: socketId } = event.requestContext;

  if (!socketId) {
    return {
      statusCode: 500,
      body: "Missing connection id",
    };
  }

  return getSocketInfo(socketId)
    .then((socketInfo) =>
      Promise.all([
        sendToRoom(socketInfo.roomNumber, "userDisconnect", socketInfo, event),
        socketInfo,
      ])
    )
    .then(([_, socketInfo]) => {
      // Delete socket info only if the user has not made a choice
      if (!socketInfo.choice) {
        return Promise.all([deleteSocketRoomInfo(socketId), socketInfo]);
      }

      return [null, socketInfo];
    })
    .then(([_, socketInfo]) => {
      if (socketInfo.roomNumber) {
        return Promise.all([getUsersInRoom(socketInfo.roomNumber), socketInfo]);
      }
    })
    .then(([data, socketInfo]) => {
      // If there are no users left in the room, delete the room
      if (data && data.length == 0) {
        return Promise.all([socketInfo, deleteRoom(socketInfo.roomNumber)]);
      }

      return [socketInfo, null];
    })
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    }))
    .catch((err) => ({
      statusCode: 500,
      body: JSON.stringify({ success: false, data: err }),
    }));
};

exports.handler = disconnectionHandler;
