import { createContext, useReducer } from "react";

export const toDoContext = createContext();

export const toDoContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO":
      return {
        toDoList: action.payload,
      };
    case "CREATE_TODO":
      return {
        toDoList: [action.payload, ...state.toDoList],
      };
    case "EDIT_TODO":
      return {
        toDoList: state.toDoList.map((task) => {
          if (task._id === action.payload._id) {
            return { ...task, title: action.payload.title };
          } else {
            return task;
          }
        }),
      };

    case "DELETE_TODO":
      return {
        toDoList: state.toDoList.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ToDoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toDoContextReducer, {
    toDoList: null,
  });

  return (
    <toDoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </toDoContext.Provider>
  );
};
