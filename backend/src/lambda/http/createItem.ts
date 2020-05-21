import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateItemRequest } from '../../requests/CreateItemRequest'
import { getJwToken } from '../utils'
import { createItem } from '../../businessLogic/items'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newItemReq: CreateItemRequest = JSON.parse(event.body)

  const jwToken = getJwToken(event.headers.Authorization)

  const newItem = await createItem(
    newItemReq,
    jwToken
  );

  console.log('New item item ', newItem)

  const item = {
    itemId: newItem.itemId,
    createdAt: newItem.createdAt,
    name: newItem.name,
    done: newItem.done
  }

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        item
    })
  }
}
