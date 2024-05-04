import { useAuthContext} from './useAuthContext';
import { useToDoContext } from './useToDoContext';


export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: toDoDispatch } = useToDoContext();
    
    const logout = () =>{

        // supprime l'utilisateur du localStorage
        localStorage.removeItem('user');

        // permet de dispatch l'action de deconnection (se trouvant dans le AuthContext )
        dispatch({type: 'LOGOUT'});
        toDoDispatch({type: 'SET_TODO', payload: null})
    }
    return {logout}
}