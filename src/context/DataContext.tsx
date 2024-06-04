// context/DataContext.tsx
import { createContext, useContext, useReducer, ReactNode } from "react";

interface State {
  userStories: any[];
}

const initialState: State = {
  userStories: [],
};

type Action = 
  | { type: "SET_USER_STORIES"; payload: any[] }
  | { type: "ADD_USER_STORY"; payload: any };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER_STORIES":
      return { ...state, userStories: action.payload };
    case "ADD_USER_STORY":
      return { ...state, userStories: [...state.userStories, action.payload] };
    default:
      return state;
  }
};

const DataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const useData = () => useContext(DataContext);

import React from "react";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
