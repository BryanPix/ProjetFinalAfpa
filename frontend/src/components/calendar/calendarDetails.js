import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from 'react';

const CalendarDetails = () => {
  const { dispatch } = useCalendarContext();
  const { user } = useAuthContext();
  const [selectedDate] = useState(new Date());
  const [events, setEvents] = useState([]); 

  useEffect(() => {
    // Fetch events when component mounts or when selectedDate changes
    const fetchEvents = async () => {
      // Fetch events for selected date
      const response = await fetch("/api/calendar/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch events:", response.statusText);
        return;
      }

      const data = await response.json();
      setEvents(data.events);
    };

    fetchEvents();
  }, [user.token]);

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
    setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
  };
  const eventsForSelectedDate = events ?  events.filter(event => {
    return (
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
    );
  }): [];

  return (
    <div className="calendarDetails text-white lg:-inset-x-44  md:w-fit">
      <h2 className="font-bold">Evenements: </h2>
      {eventsForSelectedDate.length > 0 ? (
        <ul >
          {eventsForSelectedDate.map((event) => (
            <li key={event._id}>
              <p>
                <strong>Date: </strong>{" "}
                {event.date.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p>
                <strong>Titre: </strong> {event.title}
              </p>
              <p>
                <strong>Description: </strong> {event.description}
              </p>
              <p>
                <strong>ID: </strong> {event._id}
              </p>
              <span
                className="material-symbols-outlined"
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
