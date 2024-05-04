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
            <button onClick={handleClick} className="float-right relative mb-10 px-8 py-2 border-2 text-white right-12 top-5 hidden md:block">Déconnection</button>
          </div>
          )}
          {!user && (<div className="md:flex md:justify-center md:mt-6">
            {isLoginPage && (
                <p className="invitRedirect text-white ">Vous n'avez pas de compte ? <Link to="/signup" className="text-green-300 underline ">Inscrivez-vous</Link></p> 
              )}
              {isSignupPage && (
                <p className="invitRedirect text-white ">Vous possédez un compte ? <Link to="/login" className="text-green-300 underline">Connectez-vous</Link></p>
              )}
          </div>
        )}
        </nav>
 
  );
};

export default Navbar;
