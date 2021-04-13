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
    const uuid = req.body.uuid;
    console.log(values);

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

    let output
    docClient.update(params, function(err, data) {
      if (err) {
          res.statusCode = 500;
          output = {error: "Unable to update item. Error JSON: " + JSON.stringify(err, null, 2)}
          //console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          res.statusCode = 200;
          output = {success: "UpdateItem succeeded: " + JSON.stringify(data, null, 2)}
          //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
    });

    // return an unconditional success response
    res.setHeader("Content-Type", "application/json");
    res.end(output);
  } else {
    // If it's not a POST request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
