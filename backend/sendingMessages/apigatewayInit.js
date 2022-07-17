const AWS = require("aws-sdk");

const init = (event) =>
  new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint:
      event.requestContext.domainName + "/" + event.requestContext.stage,
  });

module.exports = init;
