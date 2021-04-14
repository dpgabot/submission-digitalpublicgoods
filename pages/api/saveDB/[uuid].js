var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var docClient = new AWS.DynamoDB.DocumentClient();

export default async (req, res) => {
  if (req.method === "POST") {
    const values = req.body.values;
    const uuid = req.query.uuid;

    var params = {
      TableName: 'submission',
      Key:{
        "user_id": uuid,
      },
      UpdateExpression: "set formData = :v",
      ExpressionAttributeValues:{
          ":v": values
      },
      ReturnValues:"UPDATED_NEW"
    };

    try {
      const result = await docClient.update(params).promise();
      res.statusCode = 200;
      // console.log("UpdateItem succeeded:", JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      // console.error("Unable to update item. Error JSON:", JSON.stringify(err));
    }

    // return response
    res.setHeader("Content-Type", "application/json");
    res.end();
  } else {
    // If it's not a POST request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
