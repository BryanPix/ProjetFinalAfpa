import { useState } from "react";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const TodoForm = () => {
  const { dispatch } = useToDoContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    // permet d'eviter que la page refresh
    e.preventDefault();

    if (!user) {
      setError("Vous devez être connecté");
      return;
    }
    const toDo = { title };

    const response = await fetch("/api/toDoList", {
      method: "POST",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setError(null);
      setEmptyFields([]);
      console.log("nouvelle tâche ajouté !!", json);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      
      <label className="font-bold">To-Do List:</label>
      
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`todoInput my-2 ${
          emptyFields.includes("title") ? "error" : ""
        }`}
        placeholder="ex: Acheter du pain"
      />


      {error && (
        <div className="error text-red-700">
          {error}
        </div>
      )}
      <button className="addTodo border-2 px-3 mt-6 w-full">
      <span class="material-symbols-outlined addIcon">add_circle</span>
        Enregistrer
      </button>
    </form>
  );
};

export default TodoForm;
