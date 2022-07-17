const getDecidedInRoom = require("../utils/getDecidedInRoom");

const getDecidedInRoomFunc = (event) => {
  const { roomNumber } = JSON.parse(event.body);

  return getDecidedInRoom(roomNumber)
    .then((decidedUsers) => ({
      success: true,
      data: decidedUsers,
    }))
    .catch((error) => ({
      success: false,
      data: error,
    }));
};

exports.handler = getDecidedInRoomFunc;
