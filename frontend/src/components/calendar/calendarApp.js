// Destructuration de 'react' grace aux accolades pour récuperer seulement les propriétés "useState" et "useEffect"
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarEventPopup from "./calendarForm";
import CalendarDetails from "./calendarDetails";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/calendar.css"


const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);
  const { dispatch } = useCalendarContext();
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(new Date());


  // premier argument (useState)
  const [currentDate, setCurrentDate] = useState("");
//  deuxième argument (useEffect)
  useEffect(() => {
    // Pour la date actuelle afficher en grand :D
    // fonction permettant de recuperer la date actuelle et la formatter
    const getCurrentDate = () => {
      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return today.toLocaleDateString("fr-FR", options);
    };

    // Permet d'appliquer la date actuelle au component 
    setCurrentDate(getCurrentDate());
  }, []); // applique cet effet une seule fois grace à l'utilisation du tableau vide qui prend le second argument (useEffect)
  
  useEffect(() => {
    const fetchCalendarToDo = async () => {
        const response = await fetch("/api/calendar", {
          headers:  {
            'Authorization': `Bearer ${user.token}`
          }
        } );
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_CALENDAR", payload: json });
        }

        const transformedEvent = json.map(({date, title, body: description }) => {
          const eventDate = new Date(date); 

          return {
            date: eventDate,
            title,
            description
        };
        });
        
        setEventsForSelectedDate(transformedEvent);
    };
    if (user){
      fetchCalendarToDo();
    }
  }, [dispatch, user]);
  

  
  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date);
  }

  const handleAddEvent = (title, description) => {
    
    const newEvent = {
      date: date,
      title: title,
      description: description,
    };
    setEventsForSelectedDate([...eventsForSelectedDate, newEvent]);
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const isDateWithEvent = ({ date }) => {
    return eventsForSelectedDate.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const filteredEvents = eventsForSelectedDate.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );
  useEffect(() => {
    localStorage.setItem(
      "test",
      date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [date]);
  return (
    <div className="calendar-container p-6 md:w-9/12 md:float-right  ">
        <h1 className="capitalize text-center text-white text-2xl font-bold underline underline-offset-4 pb-6">{currentDate}</h1>

        <Calendar 
            onChange={handleDateChange} 
            value={date} 
            minDetail="year" 
            tileContent={({ date }) => 
              isDateWithEvent({ date }) && <div className="event-pointer"></div>
          }
          className="md:float-left md:mb-2"
        />
        {console.log(date.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }))}
          {showPopup && <CalendarEventPopup selectedDate={selectedDate} handleAddEvent={handleAddEvent} />}
          <CalendarDetails eventsForSelectedDate={filteredEvents} />
          <div className="form-toggle bg-blue-500 rounded-sm text-center text-gray-50 md:my-24 py-1 px-3 md:px-5 md:w-fit">
          <button onClick={togglePopup} >
            {showPopup ? "Annuler": "Ajouter Evenement"}
          </button>
          </div>
      </div>
  );
};

export default CalendarApp;