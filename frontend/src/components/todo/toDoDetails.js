import { useToDoContext } from "../../hooks/useToDoContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
// permet de formater la date presente grace à timestamps dans le model
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";

const ToDoDetails = ({ tache }) => {
  const { dispatch } = useToDoContext();
  const { user } = useAuthContext();
  const [value, setValue] = useState(tache.title);
  const [isEditing, setIsEditing] = useState(false);

  // Supprime une tâche
  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/toDoList/" + tache._id, {
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

    dispatch({ type: "DELETE_TODO", payload: json });
  };

  // Mise à jour d'une tâche
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  // Sauvegarder les changements ou non
  const handleSaveClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/toDoList/" + tache._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title: value }),
    });
    if (!response.ok) {
      console.error(
        "echec au chargement des tâches à effectuer",
        response.statusText
      );
      setIsEditing(false);
      return;
    }

    const json = await response.json();

    dispatch({ type: "EDIT_TODO", payload: json });
    setIsEditing(false);
    console.log("Mise à jour de la tache:", tache);
  };

  return (
    <div className="toDoDetails py-1 dark:text-white">
      {/* faire apparaite differents élements en fonction de la condition ternaire */}
      {!isEditing ? (
        <span className="py-1 text-white">
          {tache.title}
        </span>
      ) : (
        <textarea
          type="text"
          spellCheck="false"
          value={value}
          onChange={handleInputChange}
          autoFocus 
          className="resize-none appearance-none bg-transparent border border-white text-white"
        />
      )}
      {!isEditing && (
        <span className="material-symbols-outlined top-1.5 mx-2 cursor-pointer relative" onClick={handleEditClick}>
          edit
        </span>
      )}
      {isEditing ? (
        <span className="material-symbols-outlined top-1.5  cursor-pointer relative" onClick={handleSaveClick}>
          save
        </span>
      ) : (
        <span
          className="material-symbols-outlined top-1.5 mx-2 cursor-pointer relative "
          onClick={handleDeleteClick}
        >
          delete
        </span>
      )}
      <p className="text-sm  mb-7 mt-2 text-white font-bold">
        {formatDistanceToNow(new Date(tache.createdAt), {
          addSuffix: true,
          locale: fr,
        })}
      </p>
        <hr className="my-4"></hr>
    </div>
  );
};

export default ToDoDetails;
