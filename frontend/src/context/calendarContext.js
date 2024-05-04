import { createContext, useReducer } from "react";

export const calendarContext = createContext();

export const calendarContextReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CALENDAR':
            return {
                calendar: action.payload,
            };
        case 'CREATE_CALENDAR':
            return {
                calendar: [action.payload, ...state.calendar] 
            };
        case 'EDIT_CALENDAR':
            return{
                calendar: state.calendar.map((task) => {
                    if (task._id === action.payload._id) {
                        return { ...state, title: action.payload.title };
                    } else {
                        return task;
                    }
                })
            }
        case 'DELETE_CALENDAR':
            return {
                calendar: state.calendar.filter((w) => w._id !== action.payload._id) 
            };
        default:
            return state;
    }
};

export const CalendarContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(calendarContextReducer, {
        calendar: null,
    }); 

    return (
        <calendarContext.Provider value={{...state, dispatch}}>
         { children }
        </calendarContext.Provider>
    )

};