const getAllRoomInfo = require("../dynamoDb/roomInfo/getAllRoomNumbers");

const generateRoomNumber = () => {
  let roomNum;

  return getAllRoomInfo().then((data) => {
    // random 6 digit string
    do {
      roomNum = Math.floor(Math.random() * 900000 + 100000).toString();
    } while (
      data.find((item) => {
        return item.roomNumber === roomNum;
      })
    );

    return roomNum;
  });
};

module.exports = generateRoomNumber;
