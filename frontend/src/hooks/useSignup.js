import { useState} from 'react';
import { useAuthContext} from './useAuthContext';

export const useSignup = () => {
    // le state error est là au cas où il y a une erreur et le setError permet de changer l'état de l'erreur
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext() 

    const signup = async (email,password,name) => {
        // setIsLoading est toujours vrai car on commence la requète
        // setError est null car on veut reset la valeur de error à chaque fois qu'une requète est effectué car dans le cas où il y a une erreur et que le client veut la rectifier, il n'est pas necessaire de lui montré les erreurs (ex: si le client veut s'inscrire mais que dans le mail il oublie l'@ et le point, il commence par corriger l'@, et effectue une requète pour s'inscrire, dans ce cas l'erreur qui sera retourné sera un point manquant et non plus d'un @ absent)
        setIsLoading(true)
        setError(null)


        // l'utilisation d'un url partiel est grace au proxy se trouvant dans le package json coté frontend (le debut de l'url est bien localhost:4000)
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, name})
        })
        const json = await response.json()
        
        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // permet de conserver l'utilisateur dans localStorage et donc de le laisser connecter si present
            localStorage.setItem('user', JSON.stringify(json))

            // mise a jour du context de l'authentification
            dispatch({type: 'LOGIN', payload : json})
            
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}