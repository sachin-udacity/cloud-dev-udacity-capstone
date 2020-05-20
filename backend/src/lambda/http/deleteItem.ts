import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteItem } from '../../businessLogic/items'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const itemId = event.pathParameters.itemId
    const authorization = event.headers.Authorization;
    const authorizationParams = authorization.split(' ')
    const jwToken = authorizationParams[1]
    await deleteItem(jwToken, itemId);
    
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }
}
