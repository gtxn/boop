const SocketRoomInfoModel = require("./connect");

const putSocketRoomInfo = (socketId, roomNumber, username, isAdmin) =>
  new Promise((resolve, reject) => {
    if (
      roomNumber == undefined ||
      username == undefined ||
      isAdmin == undefined ||
      socketId == undefined
    ) {
      resolve(
        "Missing required fields. roomNumber, username, socketId and isAdmin are required fields"
      );
    } else {
      SocketRoomInfoModel.create(
        {
          socketId,
          roomNumber,
          username,
          isAdmin,
        },
        {
          overwrite: true, // allow updates to existing records
        }
      )
        .then((data) => {
          console.log("successfully put item in socketroominfo table");

          resolve(data);
        })
        .catch((err) => {
          console.log("ERROR (put item in socketroominfo table): ", err);

          reject(err);
        });
    }
  });

module.exports = putSocketRoomInfo;
