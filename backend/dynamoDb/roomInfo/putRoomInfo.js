const RoomInfoModel = require("./connect");

const putRoomInfo = (roomNumber, username, topic, rules, choicesPerPerson) =>
  new Promise((resolve, reject) => {
    if (
      roomNumber == undefined ||
      topic == undefined ||
      rules == undefined ||
      username == undefined ||
      choicesPerPerson == undefined
    ) {
      reject(
        "Missing required fields. roomNumber, topic, rules and choicesPerPerson are required fields"
      );
    } else {
      RoomInfoModel.create({
        roomNumber,
        username,
        topic,
        rules,
        choicesPerPerson,
      })
        .then((data) => {
          console.log("successfully put item in roominfo table");

          resolve(data);
        })
        .catch((err) => {
          console.log("ERROR (put item roominfo table): ", err);

          reject(err);
        });
    }
  });

module.exports = putRoomInfo;
