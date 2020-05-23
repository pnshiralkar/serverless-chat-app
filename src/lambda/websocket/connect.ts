import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import socketConnect from "../../logic/socketConnect";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId
    const connectionId = event.requestContext.connectionId

    await socketConnect(userId, connectionId);

    return {
        statusCode: 200,
        body: null
    }
}