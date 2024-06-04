"use client";
import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import React from "react";

export interface New{
    id: number;
    title: string;
    description: string;
    image: string;


}
interface State  {
    news: New[];
}
const initialState: State = {
    news: [],
};

type Action = 
  | { type: "SET_NEWS"; payload: New[] }
  | { type: "ADD_NEW"; payload: New }
  | { type: "UPDATE_NEW"; payload: New }
  | { type: "DELETE_NEW"; payload: number };


const reducer = (state: State, action: Action): State => {
    switch(action.type){
        case "SET_NEWS":
            return { ...state, news: action.payload };
        case "ADD_NEW":

        case "UPDATE_NEW":

        case "DELETE_NEW":

        default:
            return state;
    }
}