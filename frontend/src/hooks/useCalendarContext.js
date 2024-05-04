import { calendarContext } from '../context/calendarContext';
import { useContext } from 'react';

export const useCalendarContext = () => {
    const context = useContext(calendarContext);

    if(!context){
        throw Error('useCalendarContext doit être utilisé dans un calendarContextProvider');
    }

    return context
}