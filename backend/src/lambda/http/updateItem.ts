import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateItemRequest } from '../../requests/UpdateItemRequest'
import { getJwToken } from '../utils'
import { updateItem } from '../../businessLogic/items'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const itemId = event.pathParameters.itemId
  const itemItem: UpdateItemRequest = JSON.parse(event.body)
  const jwToken = getJwToken(event.headers.Authorization)
  const itemUpdate = await updateItem(
    jwToken,
    itemId,
    itemItem
  );

  console.log('Update item item ', itemUpdate)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
