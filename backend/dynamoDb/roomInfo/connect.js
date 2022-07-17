const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const schema = new dynamoose.Schema({
  roomNumber: String,
  topic: String,
  rules: String,
  choicesPerPerson: Number,
});

const RoomInfoModel = dynamoose.model(
  process.env.BOOP_ROOM_INFO_TABLENAME,
  schema
);

module.exports = RoomInfoModel;
