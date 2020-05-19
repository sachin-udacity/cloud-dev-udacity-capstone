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

export async function getItems(idToken) {
  return items;
}

export async function createItem(idToken, newItem) {
  newItem.itemId = ++nextId;
  newItem.done = false;
  items.push(newItem);
  return newItem;
}

export async function patchItem(idToken, itemId, updatedItems) {
  for(let i = 0; i < items.length; ++i) {
    if (items[i].itemId === itemId) {
      items[i].name = updatedItems.name;
      items[i].done = updatedItems.done;
    }
  }
}

export async function deleteItem(idToken, itemId) {
  for(let i = 0; i < items.length; ++i) {
    if (items[i].itemId === itemId) {
      items.splice(i, 1);
    }
  }
  --nextId;
}