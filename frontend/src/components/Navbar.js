import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation  } from 'react-router-dom';
import "../styles/loginSignup.css";
import "../styles/menuBurger.css";


const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
      logout();
    }
  return (

        <nav className="signup">
          {/* permet de montrer different bouton en fonction de si oui on non l'utilisateur est conncté */}
          {user && (<div>
            <button onClick={handleClick} className="hidden">Déconnexion</button>
          </div>
          )}
          {!user && (<div className="">
            {isLoginPage && (
                <p className="invitRedirect pb-2">Vous n'avez pas de compte ? <Link to="/signup" className="text-blue-700 underline">Inscrivez-vous</Link></p> 
              )}
              {isSignupPage && (
                <p className="invitRedirect pb-2">Vous possédez un compte ? <Link to="/login" className="text-blue-700 underline">Connectez-vous</Link></p>
              )}
          </div>
        )}
        </nav>
 
  );
};

export default Navbar;
