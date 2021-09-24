const initialState = {
  menu: [],
  loading: true,
  error: false,
  items: [],
  totalPrice: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false
      }

    case 'MENU_REQUESTED':
      return {
        ...state,
        menu: state.menu,
      }

    case 'MENU_ERROR':
      return {
        ...state,
        menu: state.menu,
        error: true
      }

    case 'ITEM_ADD_TO_CART':
      const itemIdx = state.items.findIndex(item => item.id === action.payload);
      if (itemIdx >= 0) {
        const itemInState = state.items.find(item => item.id === action.payload),
          newItem = {
            ...itemInState,
            quantity: ++itemInState.quantity
          }
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemIdx),
            newItem,
            ...state.items.slice(itemIdx + 1)
          ],
          totalPrice: state.totalPrice + newItem.price
        }
      }

      const item = state.menu.find(item => item.id === action.payload),
        newItem = {
          ...item,
          quantity: 1
        };

      return {
        ...state,
        items: [
          ...state.items,
          newItem
        ],
        totalPrice: state.totalPrice + newItem.price
      }

    case 'ITEM_DELETE_FROM_CART':
      const itemIndex = state.items.findIndex(item => item.id === action.payload),
        pickedItemPrice = state.items[itemIndex]['price'] * state.items[itemIndex]['quantity'];

      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1)
        ],
        totalPrice: state.totalPrice - pickedItemPrice
      }


    default:
      return state;
  }
}

export default reducer;