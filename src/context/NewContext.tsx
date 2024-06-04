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
            return { ...state, news: [...state.news, action.payload] };
        case "UPDATE_NEW":
            return {
                ...state,
                news: state.news.map(news =>
                    news.id === action.payload.id ? action.payload : news
                ),
            };
        case "DELETE_NEW":
            return {
                ...state,
                news: state.news.filter(news => news.id !== action.payload),
            };
        default:
            return state;
    }
};

const NewContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

export const useNews = () => useContext(NewContext);

const NewProvider = ({ children }:{children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect( () =>{
        const fetchNews = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news`);
            const data = await response.json();
            dispatch({ type: "SET_NEWS", payload: data });
        };
        fetchNews();

    },[]);

    return (

        <NewContext.Provider value={{ state, dispatch }}>
            {children}
        </NewContext.Provider>
    );
};

export default NewProvider;