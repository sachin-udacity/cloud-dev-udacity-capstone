// Adapted from Cloud Developer ND - Udacity Project 4

import Axios from 'axios'
import Config from '../auth_config.json'

let nextId = 0;

const items = [];
let item = {
  itemId: ++nextId,
  name: "Item 1",
  done: true
};
items.push(item);

item = {
  itemId: ++nextId,
  name: "Item 2",
  done: false
};
items.push(item);

item = {
  itemId: ++nextId,  
  name: "Item 3",
  done: true
};
items.push(item);

export async function getItems_(idToken) {
  return items;
}

export async function createItem_(idToken, newItem) {
  newItem.itemId = ++nextId;
  newItem.done = false;
  items.push(newItem);
  return newItem;
}

export async function patchItem_(idToken, itemId, updatedItems) {
  for(let i = 0; i < items.length; ++i) {
    if (items[i].itemId === itemId) {
      items[i].name = updatedItems.name;
      items[i].done = updatedItems.done;
    }
  }
}

export async function deleteItem_(idToken, itemId) {
  for(let i = 0; i < items.length; ++i) {
    if (items[i].itemId === itemId) {
      items.splice(i, 1);
    }
  }
  --nextId;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
