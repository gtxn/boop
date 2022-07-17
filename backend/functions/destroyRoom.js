const sendToRoom = require("../sendingMessages/sendToRoom");
const getSocketInfo = require("../dynamoDb/socketRoom/getSocketInfo");
const getUsersInRoom = require("../dynamoDb/socketRoom/getUsersInRoom");
const deleteSocketRoomInfo = require("../dynamoDb/socketRoom/deleteSocketRoomInfo");
const errorMessage = require("../sendingMessages/errorMessage");
const deleteRoom = require("../dynamoDb/roomInfo/deleteRoom");

const destroyRoom = (event) => {
  const { connectionId: socketId } = event.requestContext;

  return getSocketInfo(socketId)
    .then(({ roomNumber }) =>
      Promise.all([
        roomNumber,
        getUsersInRoom(roomNumber),
        sendToRoom(roomNumber, "roomDestroyed", {}, event),
      ])
    )
    .then(([roomNumber, usersInRoom]) =>
      Promise.all([
        deleteRoom(roomNumber),
        ...usersInRoom.map(({ socketId }) => deleteSocketRoomInfo(socketId)),
      ])
    )
    .then(() => {
      console.log("all done");
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Room destroyed",
        }),
      };
    })
    .catch((err) => {
      console.log("error", err);
      return errorMessage(
        {
          message: "Error destroying room",
        },
        event
      ).then(() => ({
        statusCode: 500,
        body: JSON.stringify({
          message: err.message,
        }),
      }));
    });
};

exports.handler = destroyRoom;
