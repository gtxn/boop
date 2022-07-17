const generateRoomNumber = require("../utils/generateRoomNum");
const putRoomInfo = require("../dynamoDb/roomInfo/putRoomInfo");
const putSocketRoomInfo = require("../dynamoDb/socketRoom/putSocketRoomInfo");
const errorMessage = require("../sendingMessages/errorMessage");
const sendMessage = require("../sendingMessages/sendMessage");

const newAdmin = (event) => {
  const { connectionId: socketId } = event.requestContext;
  const { username, topic, rules, choicesPerPerson } = JSON.parse(
    event.body
  ).data;

  return generateRoomNumber()
    .then((roomNumber) => {
      console.log(roomNumber, username, topic, rules, choicesPerPerson);

      return Promise.all([
        putRoomInfo(roomNumber, username, topic, rules, choicesPerPerson),
        roomNumber,
      ]);
    })
    .then(([data, roomNumber]) => {
      console.log("Put room info data", data);

      return Promise.all([
        putSocketRoomInfo(socketId, roomNumber, username, true),
        roomNumber,
      ]);
    })
    .then(([_, roomNumber]) =>
      sendMessage(
        "newAdmin",
        {
          roomNumber,
          topic,
          rules,
          username,
          choicesPerPerson,
        },
        event
      )
    )
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: "User created",
      }),
    }))
    .catch((err) => {
      console.log("ERROR", err);
      return errorMessage(err, event).then((e) => ({
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          data: "Send message failed",
        }),
      }));
    });
};

exports.handler = newAdmin;
