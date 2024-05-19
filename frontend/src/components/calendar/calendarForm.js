import { useState,useEffect } from "react";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CalendarEventPopup = ({ handleAddEvent, selectedDate }) => {
  const { dispatch } = useCalendarContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); 

  useEffect(() => {
    setDate(selectedDate.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }));

  }, [selectedDate]);

  const handleSubmit = async (e) => {
    // permet d'eviter que la page refresh
    e.preventDefault();
    
    if (!user) {
      setError("Vous devez être connecté");
      return;
    }
  
    if (!title && description) {
      setEmptyFields(["title"]);
      setError("Veuillez remplir le champ 'Titre.'");
      return;
    }
    if (!description && title) {
      setEmptyFields(["description"]);
      setError("Veuillez remplir le champ 'Description.'");
      return;
    }
    if (!title && !description) {
      setEmptyFields(["title, description"]);
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const formattedDate = new Date(selectedDate); // transforme selectedDate qui est affiché en format fr en format correcte pour la Base de Données
    const calendarToDo = { title, description, date: formattedDate};// envoie en format correcte les differentes valeurs 
    const response = await fetch("/api/calendar", {
      method: "POST",
      body: JSON.stringify(calendarToDo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
  
    if (!response.ok) {
      setError(json.error);
      // permet à emptyFields d'être toujours une array (problème au niveau de emptyField étant pas definie)
      setEmptyFields(json.emptyFields);
    }  
    if (response.ok){
      handleAddEvent(title,description,date);
      setTitle("");
      setDescription("");
      setDate("");
      setError(null);
      setEmptyFields([]);
      console.log("Nouvelle tâche ajoutée !!", json);
      // Permet de mettre à jour le (state,action) du useReducer (se trouvant dans le context) le premier parametre est l'état actuel(current state) et le second est l'action 
      dispatch({ type: "CREATE_CALENDAR", payload: json });
    }
  };

  return (
    <div className="div-calendarForm text-center">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="divTitre mt-3">
            <label className="labelEvent">Titre de l'évenement: </label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={` inputEvent border-b-2  ${emptyFields.includes('title') ? 'error' : ""}`}
                placeholder="ex: 8h"
            />
          </div>
          <div className="divDescription mt-2 text-center">
            <label className="labelEvent ">Description de l'évenement: </label>
            <textarea
                id="description"
                value={description}
                spellCheck="false"
                onChange={(e) => setDescription(e.target.value)}
                className={` calendarDescription inputEvent ${emptyFields.includes('description') ? 'error' : ''}`}
                placeholder="ex: Rdv medecin"
            ></textarea>
          </div>
          <div className="divDate mt-2 text-center">
            <label className="labelEvent">Date de l'évenement: </label>
            <input
                type="text"
                id="date"
                value={selectedDate.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                onChange={(e) => setDate(e.target.value)}
                className={` inputDate inputEvent bg-transparent text-center ${emptyFields.includes('date') ? 'error' : ""}`}
            />
          </div>
            <button type="submit" className="btn-submit btn-form-submit border-2 px-3 mb-5 mt-6 w-full"><span class="material-symbols-outlined addIcon">add_circle</span>Enregistrer</button>
        </form>
        {error && <p className="error-message-calendar">{error}</p>}
    </div>
  );
};

export default CalendarEventPopup;