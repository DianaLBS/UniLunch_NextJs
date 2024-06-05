"use client";
import React, { createContext, useReducer, useContext, ReactNode, useEffect } from "react";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface State {
  cartItems: CartItem[];
  isCartVisible: boolean;
}

const initialState: State = {
  cartItems: [],
  isCartVisible: false,
};

type Action =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "SHOW_CART" }
    | { type: "HIDE_CART" };

const cartReducer = (state: State, action: Action): State => {
switch (action.type) {
    case "ADD_TO_CART":
    console.log("Action ADD_TO_CART:", action.payload);
    const existingItem = state.cartItems.find(item => item.productId === action.payload.productId);
    if (existingItem) {
        return {
        ...state,
        cartItems: state.cartItems.map(item =>
            item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        ),
        isCartVisible: true,
        };
    }
    return { ...state, cartItems: [...state.cartItems, action.payload], isCartVisible: true};
    case "REMOVE_FROM_CART":
    console.log("Action REMOVE_FROM_CART:", action.payload);
    const updatedCart = state.cartItems.filter(item => item.productId !== action.payload);
    return { ...state, cartItems: updatedCart, isCartVisible: updatedCart.length > 0 };
    case "UPDATE_QUANTITY":
    console.log("Action UPDATE_QUANTITY:", action.payload);
    return {
        ...state,
        cartItems: state.cartItems.map(item =>
        item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
    };
    case "CLEAR_CART":
    console.log("Action CLEAR_CART");
    return { ...state, cartItems: [], isCartVisible: false };
    case "SHOW_CART":
      return { ...state, isCartVisible: true };
    case "HIDE_CART":
      return { ...state, isCartVisible: false };
    default:
    return state;
}
};
  

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  useEffect(() => {
    if (state.cartItems.length === 0) {
      dispatch({ type: "HIDE_CART" });
    }
  }, [state.cartItems.length]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export type { CartItem };  // Exporta el tipo CartItem
export default CartProvider;
