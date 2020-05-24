import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import seenMsg from "../../logic/seenMsg";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId
    await seenMsg(userId, JSON.parse(event.body).to)

    return {
        statusCode: 204,
        body: null
    }
}