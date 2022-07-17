const RoomInfoModel = require("./connect");

const getAllRoomInfo = () =>
  RoomInfoModel.scan().attributes(["roomNumber"]).exec();

module.exports = getAllRoomInfo;
