import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateItemRequest } from '../../requests/CreateItemRequest'
import { createItem } from '../../businessLogic/items'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newItemReq: CreateItemRequest = JSON.parse(event.body)

  const authorization = event.headers.Authorization;
  const authorizationParams = authorization.split(' ')
  const jwToken = authorizationParams[1]

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
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        item
    })
  }
}
