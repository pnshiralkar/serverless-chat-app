import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import getProfile from "../../logic/getProfile";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer.principalId
    const result = await getProfile(userId)

    return {
        statusCode: result.length>0 ? 200 : 404,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result)
    }
}