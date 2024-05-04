import { createContext, useReducer, useEffect } from 'react'

export const authContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    
    // En premier argument on declenche une fonction est en deuxième argument on déclanche un tableau vide(le tableau sert à déclancher la fonction une seule fois)
    useEffect(() =>{

        // localStorage est un string, donc on l'analyse grace à JSON.parse pour qu'il le construise en valeur javascript et l'utiliser par la suite
        const user = JSON.parse(localStorage.getItem('user'));
        // Déclanchement uniquement si c'est vrai, si c'est faux le user = null comme indiqué plus haut
        if(user){
            dispatch({ type: 'LOGIN', payload: user })
        }
    },[])

    console.log('AuthContext state: ', state);

    return(
        <authContext.Provider value={{...state, dispatch}}>
            { children }
        </authContext.Provider>
    )
}