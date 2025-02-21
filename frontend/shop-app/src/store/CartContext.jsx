import { createContext, useEffect, useState, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  totalPrice: 0,
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const existingCartItem = state.items[existingCartItemIndex];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });
  const [totalPrice, setTotalPrice] = useState()

  useEffect(() => {
    const newTotal = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    setTotalPrice(Number(newTotal.toFixed(2)));
  }, [cart.items]);
  

  function addItem(item){
    dispatchCartAction({type: 'ADD_ITEM', item});
  }
  function removeItem(id){
    dispatchCartAction({type: 'REMOVE_ITEM', id});
  }

  const cartContext={
    items: cart.items,
    addItem,
    removeItem,
    totalPrice,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
