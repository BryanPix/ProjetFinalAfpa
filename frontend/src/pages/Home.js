// components
import CalendarApp from "../components/calendar/calendarApp";
import Sidebar from "../components/menuBurger";

const Home = () => {
  return (
    <div className="home">
      <div className="calendar text-black" >
      <Sidebar />
      </div>
      <div className="calendar text-black">
        <CalendarApp />
      </div>
     
    </div>
  );
};

export default Home;
