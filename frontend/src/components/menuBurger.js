import { slide as Menu } from 'react-burger-menu';
import '../styles/menuBurger.css';
import Todo from './todo/toDo';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';


export default function Sidebar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }
  return (
    <Menu>
      <div className="infoUser">
      <span className="welcomeMessage">Bienvenue {user.name} !</span>
      </div>
      <hr className='my-7'></hr>
    <Todo />  
    <button onClick={handleClick} className="btn-logout border-2 px-3 mb-5 mt-6 w-full">Déconnexion</button>
    </Menu>
  );
};

