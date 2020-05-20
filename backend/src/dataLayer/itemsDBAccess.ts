import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Item } from '../models/Item'
import { ItemUpdate } from '../models/ItemUpdate'

const XAWS = AWSXRay.captureAWS(AWS);

export class ItemsDBAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly itemsTable = process.env.ITEMS_TABLE,
    private readonly userIdIndex = process.env.ITEMS_USERID_INDEX) {
  }

  async getItemsForUser(userId: string): Promise<Item[]> {
    const result = await this.docClient.query({
      TableName : this.itemsTable,
      IndexName : this.userIdIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
          ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as Item[]
  }

  async getItem(userId: string, itemId: string) {
    return await this.docClient
      .get({
        TableName: this.itemsTable,
        Key: {
          "userId": userId,
          "itemId": itemId
        }
      })
      .promise()
  }

  async createItem(totoItem: Item): Promise<Item> {
    await this.docClient.put({
      TableName: this.itemsTable,
      Item: totoItem
    }).promise()

    return totoItem
  }

  async updateItem(userId: string, itemId: string, itemUpdate: ItemUpdate): Promise<ItemUpdate> {
    await this.docClient.update({
      TableName: this.itemsTable,
      Key: {
        "userId": userId,
        "itemId": itemId
      },
      UpdateExpression: "set #name = :name, done = :d",
      ConditionExpression: "itemId = :id",
      ExpressionAttributeValues:{
          ":id": itemId,
          ":name": itemUpdate.name,
          ":d":itemUpdate.done
      },
      ExpressionAttributeNames: {
        "#name": "name"
      },
      ReturnValues:"UPDATED_NEW"
    }).promise()

    return itemUpdate;
  }

  async deleteItem(userId: string, itemId: string) {
    return await this.docClient.delete({
      TableName: this.itemsTable,
      Key: {
        "userId": userId,
        "itemId": itemId
      },
      ConditionExpression: "itemId = :id",
      ExpressionAttributeValues:{
          ":id":itemId
      }
    }).promise()
  }

  async idExists(userId: string, itemId: string) {
    const result = await this.getItem(userId, itemId)
    console.log(`Item check for : ${userId} & ${itemId} `, result)
    return !!result.Item
  }

  async updateImageUrl(userId: string, itemId: string, imageUrl: string) {
    console.log('Updating item item image: ', imageUrl)

    // update db
    await this.docClient.update({
      TableName: this.itemsTable,
      Key: {
        "userId": userId,
        "itemId": itemId
      },
      UpdateExpression: "set attachmentUrl = :url",
      ExpressionAttributeValues:{
          ":url": imageUrl
      }
    }).promise()
  }  
}
