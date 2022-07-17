const SocketRoomInfoModel = require("./connect");

const deleteSocketRoomInfo = (socketId) =>
  SocketRoomInfoModel.delete({ socketId });

module.exports = deleteSocketRoomInfo;
