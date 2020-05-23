import * as AWS from "aws-sdk";
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

const docClient = new XAWS.DynamoDB.DocumentClient()

export const create = async (table, item)=>{
    await docClient.put({
        TableName: table,
        Item: item
    }).promise()
}

export const queryMsgs = async (table, chatName): Promise<object[]> => {
    const result = await docClient.query({
        TableName: table,
        IndexName: process.env.TABLE_MSGS_GSI,
        KeyConditionExpression: 'chatName = :cn',
        ExpressionAttributeValues: {
            ':cn': chatName
        },
        ScanIndexForward: true
    }).promise()
    return result.Items
}

export const query = async (table, user): Promise<object[]> => {
    const result = await docClient.query({
        TableName: table,
        IndexName: process.env.INDEX_NAME,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': user
        },
        ScanIndexForward: true
    }).promise()
    return result.Items
}

export const queryByUsername = async (table, user): Promise<object[]> => {
    const result = await docClient.query({
        TableName: table,
        IndexName: process.env.TABLE_USERS_GSI2,
        KeyConditionExpression: 'username = :userId',
        ExpressionAttributeValues: {
            ':userId': user
        },
        ScanIndexForward: true
    }).promise()
    return result.Items
}

export const queryByConnId = async (table, connId): Promise<object[]> => {
    const result = await docClient.query({
        TableName: table,
        IndexName: process.env.TABLE_USERS_GSI,
        KeyConditionExpression: 'socketConnectionId = :connId',
        ExpressionAttributeValues: {
            ':connId': connId
        },
        ScanIndexForward: true
    }).promise()
    return result.Items
}

export const update = async (table, userId, todoId, updatedTodo): Promise<object> =>{
    const result = await docClient.update({
        TableName: table,
        Key: {
            "ownerId": "" + userId,
            "todoId": "" + todoId
        },
        UpdateExpression: 'set dueDate = :dueDate, #n = :name, done = :done',
        ExpressionAttributeNames:{
            '#n': 'name'
        },
        ExpressionAttributeValues: {
            ':name': updatedTodo.name,
            ':dueDate': updatedTodo.dueDate,
            ':done': updatedTodo.done
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

    return result.Attributes
}


export const updateConn = async (table, userId, connId): Promise<object> =>{
    const result = await docClient.update({
        TableName: table,
        Key: {
            "userId": "" + userId,
        },
        UpdateExpression: 'set socketConnectionId = :connId',
        ExpressionAttributeValues: {
            ':connId': connId,
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

    return result.Attributes
}


export const removeConn = async (table, userId): Promise<object> =>{
    const result = await docClient.update({
        TableName: table,
        Key: {
            "userId": "" + userId,
        },
        UpdateExpression: 'remove socketConnectionId',
        ReturnValues: "UPDATED_NEW"
    }).promise()

    return result.Attributes
}


export const updateChats = async (table, userId, newChats): Promise<object> =>{
    const result = await docClient.update({
        TableName: table,
        Key: {
            "userId": "" + userId,
        },
        UpdateExpression: 'set chats = :chats',
        ExpressionAttributeValues: {
            ':chats': newChats,
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

    return result.Attributes
}

export const del = async (table, userId, todoId): Promise<void> => {
    await docClient.delete({
        TableName: table,
        Key: {
            "ownerId": "" + userId,
            "todoId": "" + todoId
        }
    }).promise()
}

export const updateUrl = async (table, userId, todoId, url): Promise<void> => {
    await docClient.update({
        TableName: table,
        Key: {
            "ownerId": "" + userId,
            "todoId": "" + todoId
        },
        UpdateExpression: 'set attachmentUrl = :url',
        ExpressionAttributeValues: {
            ':url': url,
        }
    }).promise()
}