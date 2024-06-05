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
    totalValue: number;
  }
  
  const initialState: State = {
    cartItems: [],
    isCartVisible: false,
    totalValue: 0,
  };
  
  type Action =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "SHOW_CART" }
    | { type: "HIDE_CART" }
    | { type: "UPDATE_TOTAL" }
    | { type: "LOAD_CART"; payload: State };
  
  const cartReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "ADD_TO_CART":
        const existingItem = state.cartItems.find(item => item.productId === action.payload.productId);
        if (existingItem) {
          const updatedCartItems = state.cartItems.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
          return {
            ...state,
            cartItems: updatedCartItems,
            isCartVisible: true,
            totalValue: updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          };
        }
        const newCartItems = [...state.cartItems, action.payload];
        return {
          ...state,
          cartItems: newCartItems,
          isCartVisible: true,
          totalValue: newCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        };
      case "REMOVE_FROM_CART":
        const filteredCartItems = state.cartItems.filter(item => item.productId !== action.payload);
        return {
          ...state,
          cartItems: filteredCartItems,
          isCartVisible: filteredCartItems.length > 0,
          totalValue: filteredCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        };
      case "UPDATE_QUANTITY":
        const updatedItems = state.cartItems.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        return {
          ...state,
          cartItems: updatedItems,
          totalValue: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        };
      case "CLEAR_CART":
        return { ...state, cartItems: [], isCartVisible: false, totalValue: 0 };
      case "SHOW_CART":
        return { ...state, isCartVisible: true };
      case "HIDE_CART":
        return { ...state, isCartVisible: false };
        
        case "LOAD_CART":
            return action.payload;

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
    
    useEffect(() => {
            const savedCart = localStorage.getItem("cartState");
            if (savedCart) {
                dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
            }
        }, []);

    useEffect(() => {
        localStorage.setItem("cartState", JSON.stringify(state));
    }, [state]);

    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export type { CartItem };  // Exporta el tipo CartItem
  export default CartProvider;