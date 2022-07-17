const RoomInfoModel = require("./connect");

const deleteRoom = (roomNumber) => RoomInfoModel.delete({ roomNumber });

module.exports = deleteRoom;
