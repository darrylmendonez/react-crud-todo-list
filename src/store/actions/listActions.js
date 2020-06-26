export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    item
  }
}

export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    id
  }
}

export const launchEditor = (id) => {
  return {
    type: 'LAUNCH_EDITOR',
    id
  }
}

export const saveEdit = (item) => {
  return {
    type: 'SAVE_EDIT',
    item
  }
}