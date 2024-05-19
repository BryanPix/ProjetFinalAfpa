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
    <div className="toDoDetails">
      {/* faire apparaite differents élements en fonction de la condition ternaire */}
      {!isEditing ? (
        <span className="todoTitle">
          {tache.title}
        </span>
      ) : (
        <textarea
          type="text"
          spellCheck="false"
          value={value}
          onChange={handleInputChange}
          autoFocus 
          className="textAreaTodo bg-transparent outline-none border-2 w-full"
        />
      )}
      {!isEditing && (
        <span className="material-symbols-outlined iconEdit" onClick={handleEditClick}>
          edit
        </span>
      )}
      {isEditing ? (
        <span className="iconSave" onClick={handleSaveClick}>
          Modifier
        </span>
      ) : (
        <span
          className="material-symbols-outlined iconDelete"
          onClick={handleDeleteClick}
        >
          delete
        </span>
      )}
      <p className="todoTimestamp">
        {formatDistanceToNow(new Date(tache.createdAt), {
          addSuffix: true,
          locale: fr,
        })}
      </p>
        <hr className="my-3"></hr>
    </div>
  );
};

export default ToDoDetails;
