import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CalendarDetails = ({ eventsForSelectedDate }) => {
  const { dispatch } = useCalendarContext();
  const { user } = useAuthContext();

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/calendar/" + eventsForSelectedDate._id, {
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
  };

  return (
    <div className="calendarDetails text-white lg:-inset-x-44  md:w-fit">
      <h2 className="font-bold">Evenements: </h2>
      <h4>{eventsForSelectedDate.title}</h4>
      {eventsForSelectedDate.length > 0 ? (
        <ul>
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
              <span
                className="material-symbols-outlined"
                onClick={handleDeleteClick}
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
