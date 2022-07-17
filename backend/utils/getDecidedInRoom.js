const getUsersInRoom = require("../dynamoDb/socketRoom/getUsersInRoom");

const getDecidedInRoom = (roomNumber) => {
  return getUsersInRoom(roomNumber).then((allUsersInRoom) =>
    allUsersInRoom.filter((user) => user.choice).map(({ username }) => username)
  );
};

module.exports = getDecidedInRoom;
