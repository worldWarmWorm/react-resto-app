const menuLoaded = (newMenu) => ({type: 'MENU_LOADED', payload: newMenu}),
  menuRequested = () => ({type: 'MENU_REQUESTED'}),
  menuError = (error) => ({type: 'MENU_ERROR', error}),
  addedToCart = (id) => ({type: 'ITEM_ADD_TO_CART', payload: id}),
  deleteFromCart = (id) => ({type: 'ITEM_DELETE_FROM_CART', payload: id});

export { menuLoaded, menuRequested, menuError, addedToCart, deleteFromCart };