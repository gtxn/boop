const SocketRoomInfoModel = require("./connect");

const getUsersInRoom = (roomNum) =>
  SocketRoomInfoModel.scan("roomNumber").eq(roomNum).exec();

module.exports = getUsersInRoom;
