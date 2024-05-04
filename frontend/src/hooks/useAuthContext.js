import { authContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(authContext);

    if(!context){
        throw Error('useAuthContext doit être utilisé dans un AuthContextProvider');
    }

    return context
}