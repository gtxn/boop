const SocketRoomInfoModel = require("./connect");

const userAddChoice = (socketId, choices) =>
  new Promise((resolve, reject) => {
    if (socketId == undefined || choices == undefined) {
      reject(
        "Missing required fields. SocketId and choice are required fields"
      );
    } else {
      console.log("Updating choices");

      SocketRoomInfoModel.update({
        socketId,
        choice: JSON.stringify(choices),
      })
        .then((data) => {
          console.log("successfully put choice in socketroominfo table");

          resolve(data);
        })
        .catch((err) => {
          console.log("ERROR (put choice in socketroominfo table): ", err);

          reject(err);
        });
    }
  });

module.exports = userAddChoice;
