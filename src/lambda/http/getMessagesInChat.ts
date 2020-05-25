import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import getMessagesInChat from "../../logic/getMessagesInChat";
import {getDownloadUrl} from "../../dataLayer/s3";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId
    const withId = event.pathParameters.withId

    const result = await getMessagesInChat(userId, withId)

    for(let i in result){
        if(result[i]["type"] === 'photo'){
            result[i]['photoUrl'] = await getDownloadUrl(process.env.BUCKET_NAME, result[i]['path'])
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result)
    }
}