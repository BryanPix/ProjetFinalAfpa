import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation  } from 'react-router-dom';
import "../styles/loginSignup.css";
import "../styles/menuBurger.css";


const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  
    const { user } = useAuthContext();

    
  return (

        <nav className="signup">
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
