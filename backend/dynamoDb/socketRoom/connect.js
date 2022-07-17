const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const schema = new dynamoose.Schema({
  socketId: String,
  roomNumber: String,
  username: String,
  choice: String,
  isAdmin: Boolean,
});

const RoomInfoModel = dynamoose.model(
  process.env.BOOP_SOCKET_ROOM_TABLENAME,
  schema
);

module.exports = RoomInfoModel;
