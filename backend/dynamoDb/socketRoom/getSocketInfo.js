const SocketRoomInfoModel = require("./connect");

const getSocketInfo = (socketId) => SocketRoomInfoModel.get(socketId);

module.exports = getSocketInfo;
