import { useState } from "react";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CalendarEventPopup = ({ handleAddEvent }) => {
  const { dispatch } = useCalendarContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const calendarDate = localStorage.test;
  const [date, setDate] = useState( calendarDate);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); 
  

  const handleEventTitleChange = (e) => {
    setTitle(e.target.value);
    setError("");
  }
  
  const handleEventDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError("");
  }
 
  const handleEventDateChange = (e) => {
    setDate(e.target.value);
    setError("");
  }
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
      setEmptyFields(["hour"]);
      setError("Veuillez remplir le champ 'Description.'");
      return;
    }
    if (!title && !description) {
      setEmptyFields(["title, hour"]);
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const calendarToDo = { title, description, date};
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
      setEmptyFields(json.emptyFields || []);
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
    <div className=" block text-white  ">
        <form onSubmit={handleSubmit} className="form-container md:w-fit md:float-right md:pl-6 ">
            <label className="font-bold">Titre de l'évenement: </label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={handleEventTitleChange}
                className={` border-2 bg-transparent block mb-4 ${emptyFields.includes('title') ? 'error' : ""}`}
            />
            <label className="font-bold">Description de l'évenement: </label>
            <textarea
                id="description"
                value={description}
                spellCheck="false"
                onChange={handleEventDescriptionChange}
                className={`  border-2 bg-transparent block mb-4resize-none ${emptyFields.includes('description') ? 'error' : ''}`}
            ></textarea>
            <label className="font-bold">Date de l'évenement: </label>
            <input
                type="text"
                id="date"
                value={date}
                onChange={handleEventDateChange}
                className={` border-2 bg-transparent block mb-4 ${emptyFields.includes('date') ? 'error' : ""}`}
            />
            <button type="submit" className="block bg-blue-500 rounded-sm text-center text-white my-3 py-1 px-3 ">Ajouter Evenement</button>
        </form>
        {error && <p className="error-message text-red-500 text-center border-2 border-red-500 md:float-right md:relative md:left-80 md:bottom-20  md:w-fit lg:inset-y-0 lg:inset-x-6">{error}</p>}
    </div>
  );
};

export default CalendarEventPopup;