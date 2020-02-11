import uuid from 'uuid';

const initState = {
  title: 'Things to do today',
  listItems: [
    {
      id: uuid(),
      task: 'Buy milk',
    },
    {
      id: uuid(),
      task: 'Clean kitchen',
    },
    {
      id: uuid(),
      task: 'Make bed'
    }
  ],
  editItemStatus: {
    isUserEditing: false,
    id: uuid(),
    currentItem: ''
  }
}

let remainingItems;

const listReducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        listItems: state.listItems.concat(action.item)
      }
    case 'LAUNCH_EDITOR':
      remainingItems = state.listItems.filter(listItem => {
        return action.id !== listItem.id
      });
      let selectedItem = state.listItems.find(item => item.id === action.id);
      return {
        ...state,
        listItems: remainingItems,
        editItemStatus: {
          isUserEditing: true,
          id: uuid(),
          currentItem: selectedItem.task
        }
      }
    case 'SAVE_EDIT':
      return {
        ...state,
        listItems: state.listItems.concat(action.item),
        editItemStatus: {
          isUserEditing: false
        }
      }
    case 'DELETE_ITEM':
      remainingItems = state.listItems.filter(listItem => {
        return action.id !== listItem.id
      });
      return {
        ...state,
        listItems: remainingItems
      }
    default:
      return state
  }
}

export default listReducer;