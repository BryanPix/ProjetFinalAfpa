import { toDoContext } from '../context/toDoContext';
import { useContext } from 'react';

export const useToDoContext = () => {
    const context = useContext(toDoContext);

    if(!context){
        throw Error('useToDoContext doit être utilisé dans un toDoContextProvider');
    }

    return context
}