import * as uuid from 'uuid'

import { Item } from '../models/Item'
import { ItemsDBAccess } from '../dataLayer/itemsDBAccess'
import { CreateItemRequest } from '../requests/CreateItemRequest'
import { UpdateItemRequest } from '../requests/UpdateItemRequest'
import { parseUserId } from '../auth/utils'
import { ItemUpdate } from '../models/ItemUpdate'

const itemsAccess = new ItemsDBAccess()

export async function getItemsForUser(jwToken: string): Promise<Item[]> {
  const userId: string = parseUserId(jwToken)

  console.log('Getting items for ', userId)
  return itemsAccess.getItemsForUser(userId)
}

export async function createItem(
  createItemRequest: CreateItemRequest,
  jwToken: string
): Promise<Item> {
  console.log('Deleting item')
  const itemId = uuid.v4()
  const userId = parseUserId(jwToken)

  console.log('Creating item for ', userId)
  return await itemsAccess.createItem({
    userId: userId,
    itemId: itemId,
    createdAt: new Date().toISOString(),
    name: createItemRequest.name,
    done: false
  })
}

export async function updateItem(
  jwToken: string,
  itemId: string,
  updateItemRequest: UpdateItemRequest, 
): Promise<ItemUpdate> {
  console.log('Updating item')

  // get user from token
  const userId: string = parseUserId(jwToken)

  // check if id exists
  console.log(`Verifying item for ${userId} & ${itemId}`)
  const itemUpdate : ItemUpdate = {
    name: updateItemRequest.name,
    done: updateItemRequest.done
  }
  const isIdValid = await itemsAccess.idExists(userId, itemId)
  if (!isIdValid) {
    return itemUpdate;
  } 

  console.log('Updating item for ', userId)
  return await itemsAccess.updateItem(userId, itemId, itemUpdate)
}

export async function deleteItem(jwToken: string, itemId: string) {
  // get user from token
  const userId = parseUserId(jwToken)

  console.log(`Verifying item for ${userId} & ${itemId}`)
  const isIdValid = await itemsAccess.idExists(userId, itemId)
  if (!isIdValid) {
    return;
  } 

  await itemsAccess.deleteItem(userId, itemId)
}