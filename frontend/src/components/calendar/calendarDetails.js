import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";

const CalendarDetails = ({ selectedDate }) => {
  const { dispatch } = useCalendarContext();
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Permet de fetch les evenement lorsque la page se charge ou quand on clique sur une autre date sur le calendrier (avec selectedDate)
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
    
        const data = await response.json();
        // Permet de mettre à jour les données en tant qu'evenement
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEvents();
    console.log(fetchEvents);
    // Permet d'inclure selectedDate en tant que dependance
  }, [user.token, selectedDate]);
  
  // Suppression événement
  const handleDeleteClick = async (eventId) => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/calendar/" + eventId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!response.ok) {
      console.error(
        "echec au chargement des tâches à effectuer",
        response.statusText
      );
      return;
    }
    const json = await response.json();

    dispatch({ type: "DELETE_CALENDAR", payload: json });
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== eventId)
    );
  };
  const eventsForSelectedDate = events
    ? events.filter((event) => {
      // permet de convertir la date string en Date objet
      const eventDate = new Date(event.date); 
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        );
      })
    : [];
console.log(eventsForSelectedDate);

  return (
    <div className="calendarDetails">
      <h2 className="calendarEvents my-3">Evenements: </h2>
      {eventsForSelectedDate.length > 0 ? (
        <ul>
          {eventsForSelectedDate.map((event) => (
            <li key={event._id} className="eventList mb-3 p-3 pt-2 pb-1">
              <p> 
              <strong className="eventTitle">Date: </strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong className="eventTitle">Titre: </strong> {event.title}
              </p>
              <p>
                <strong className="eventTitle">Description: </strong> {event.description}
              </p>
              <span
                className="material-symbols-outlined closeEvents "
                onClick={() => handleDeleteClick(event._id)}
              >
                delete
              </span>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className="">Aucun évenement aujourd'hui</p>
      )}
    </div>
  );
};

export default CalendarDetails;
