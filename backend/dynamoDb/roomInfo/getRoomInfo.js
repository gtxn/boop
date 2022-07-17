const RoomInfoModel = require("./connect");

const getRoomInfo = (roomId) => RoomInfoModel.get(roomId);

module.exports = getRoomInfo;
