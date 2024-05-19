// components
import CalendarApp from "../components/calendar/calendarApp";
import Sidebar from "../components/menuBurger";
import Logo from "../components/mainLogo";
import '../styles/calendar.css';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Logo />
      <CalendarApp />
    </div>
  );
};

export default Home;
