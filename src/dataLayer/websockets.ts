import * as AWS from "aws-sdk";
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

const apiDetails = {
    apiVersion: "2018-11-29",
    endpoint: process.env.API_ENDPOINT
}

const apiGateway = new XAWS.ApiGatewayManagementApi(apiDetails);

export const notify = async (connId: string, payload: object): Promise<void> => {
    try {
        if (connId) {
            await apiGateway.postToConnection({
                ConnectionId: connId,
                Data: JSON.stringify(payload)
            }).promise()
        }
    }catch (_) {}
}