var AWS = require("aws-sdk");

var aws_region = process.env["AWS_REGION"] ? process.env["AWS_REGION"] : "us-east-1";
var aws_profile = process.env["AWS_PROFILE"] ? process.env["AWS_PROFILE"] : "default";

AWS.CredentialProviderChain.defaultProviders = [
  function () {
    return new AWS.EnvironmentCredentials("AWS");
  },
  function () {
    return new AWS.EnvironmentCredentials("AMAZON");
  },
  function () {
    return new AWS.SharedIniFileCredentials({ profile: aws_profile ? aws_profile : "default" });
  },
  function () {
    return new AWS.EC2MetadataCredentials();
  },
];

var chain = new AWS.CredentialProviderChain();

chain.resolve((err, cred) => {
  if (err) {
    console.log("Error", err);
  } else {
    AWS.config.credentials = cred;
    console.log("Credentials", AWS.config.credentials);
  }
});

AWS.config.update({ region: aws_region });
