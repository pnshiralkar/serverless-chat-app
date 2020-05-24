import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import createMsg from "../../logic/createMsg";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId
    const result = await createMsg(userId, JSON.parse(event.body).to, JSON.parse(event.body).msg, event.requestContext.connectionId)

    return {
        statusCode: 201,
        body: JSON.stringify(result)
    }
}