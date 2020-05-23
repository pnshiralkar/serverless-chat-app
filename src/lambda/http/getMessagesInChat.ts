import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import getMessagesInChat from "../../logic/getMessagesInChat";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId
    const withId = event.pathParameters.withId

    const result = await getMessagesInChat(userId, withId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result)
    }
}