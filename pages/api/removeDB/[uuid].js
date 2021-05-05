var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

var docClient = new AWS.DynamoDB.DocumentClient();

export default async (req, res) => {
  if (req.method === "GET") {
    const uuid = req.query.uuid;

    var params = {
      TableName: "submission",
      Key: {
        user_id: uuid,
      },
    };

    let output;
    try {
      const result = await docClient.delete(params).promise();
      res.statusCode = 200;
      output = JSON.stringify(result);
      // console.log("DeleteItem succeeded:", JSON.stringify(result, null, 2));
    } catch (err) {
      res.statusCode = 500;
      output = {
        error: "Unable to delete item. Error JSON: " + JSON.stringify(err, null, 2),
      };
      // console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    }

    // return response
    res.setHeader("Content-Type", "application/json");
    res.end(output);
  } else {
    // If it's not a GET request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
