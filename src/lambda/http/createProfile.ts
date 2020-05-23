import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import createProfile from "../../logic/createProfile";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId

    const result = await createProfile(userId, JSON.parse(event.body).username, JSON.parse(event.body).name)

    return {
        statusCode: 201,
        body: JSON.stringify(result)
    }
}