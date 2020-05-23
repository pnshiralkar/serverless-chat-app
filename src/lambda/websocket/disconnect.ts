import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import socketDisconnect from "../../logic/socketDisconnect";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const connectionId = event.requestContext.connectionId

    await socketDisconnect(connectionId);

    return {
        statusCode: 200,
        body: null
    }
}