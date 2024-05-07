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
      <div className="infoNom text-white mb-2">
      <span className="font-bold">Nom: </span><span>{user.name}</span>
      </div>
      <div className="infoEmail text-white">
      <span className="font-bold">Email: </span><span>{user.email}</span>
      </div>
      </div>
    <Todo />  
    <button onClick={handleClick} className="relative mb-10 px-8 py-2 border-2 text-white">Déconnexion</button>
    </Menu>
  );
};

