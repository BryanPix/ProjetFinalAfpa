// Destructuration de 'react' grace aux accolades pour récuperer seulement les propriétés "useState" et "useEffect"
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarEventPopup from "./calendarForm";
import CalendarDetails from "./calendarDetails";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/calendar.css";

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
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CALENDAR", payload: json });
      }

      const transformedEvent = json.map(
        ({ date, title, body: description }) => {
          const eventDate = new Date(date);

          return {
            date: eventDate,
            title,
            description,
          };
        }
      );

      setEventsForSelectedDate(transformedEvent);
    };
    if (user) {
      fetchCalendarToDo();
    }
  }, [dispatch, user]);

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date);
  };

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

  return (
    <div className="calendar-container ">
      <h1 className="currentDate text-center mb-3">{currentDate}</h1>

      <Calendar
        onChange={handleDateChange}
        value={date}
        minDetail="year"
        tileContent={({ date }) =>
          isDateWithEvent({ date }) && <div className="event-pointer relative"></div>
        }
        className=""
      />
      {showPopup && (
        <CalendarEventPopup
          selectedDate={selectedDate}
          handleAddEvent={handleAddEvent}
        />
      )}
      {/* Permer d'afficher les evenements en fonction de la date sur laquelle on clique */}
      <CalendarDetails selectedDate={selectedDate} />
      <div className="form-toggle">
        <button
          onClick={togglePopup}
          className="btn-submit btn-event border-2 px-3 mb-5 mt-2 w-full "
        >
          {showPopup ? (
            <span class="">Annuler</span>
          ) : (
            <span>
              <span class="material-symbols-outlined addIcon">add_circle</span>
              Ajouter Evenement
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CalendarApp;
