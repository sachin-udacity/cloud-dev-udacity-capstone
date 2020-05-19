// Adapted from Cloud Developer ND - Udacity Project 4

import Axios from 'axios'
import Config from '../auth_config.json'

export async function getItems(idToken) {
  console.log('Fetching items')
  const response = await Axios.get(`${Config.apiEndpoint}/items`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Itemss:', response.data)
  return response.data.items
}

export async function createItem(idToken, newItems) {
  const response = await Axios.post(`${Config.apiEndpoint}/items`,  JSON.stringify(newItems), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchItem(idToken, itemId, updatedItems) {
  await Axios.patch(`${Config.apiEndpoint}/items/${itemId}`, JSON.stringify(updatedItems), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteItem(idToken, itemId) {
  await Axios.delete(`${Config.apiEndpoint}/items/${itemId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}
