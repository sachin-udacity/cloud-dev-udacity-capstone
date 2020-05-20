import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateItemRequest } from '../../requests/UpdateItemRequest'
import { updateItem } from '../../businessLogic/items'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const itemId = event.pathParameters.itemId
  const itemItem: UpdateItemRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization;
  const authorizationParams = authorization.split(' ')
  const jwToken = authorizationParams[1]
  const itemUpdate = await updateItem(
    jwToken,
    itemId,
    itemItem
  );

  console.log('Update item item ', itemUpdate)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
