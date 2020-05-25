import * as AWS from "aws-sdk";

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export const getUploadUrl = async (bucket: string, filename: string): Promise<string> => {
    const s3 = new XAWS.S3()

    const url = s3.getSignedUrl('putObject', {
        Bucket: bucket,
        Key: filename,
        Expires: 60 * 5,
        ContentType: 'application/x-www-form-urlencoded'
    })

    return url
}

export const getDownloadUrl = async (bucket: string, filename: string): Promise<string> => {
    const s3 = new XAWS.S3()

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: filename,
        Expires: 60 * 5,
    })

    return url
}