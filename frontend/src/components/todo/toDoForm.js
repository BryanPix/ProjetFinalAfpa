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
    <form className="todoForm my-4" onSubmit={handleSubmit}>
      <label className="py-1 text-white font-bold text-2xl">To-Do List</label>
      
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`todoInput appearance-none bg-transparent border-b border-white my-4 text-white  ${
          emptyFields.includes("title") ? "error" : ""
        }`}
        placeholder="Ajouter une tâche"
      />


      {error && (
        <div className="error border-2 border-red-500 text-red-500 rounded-sm text-center text-base p-1 ">
          {error}
        </div>
      )}
      <button className="relative mt-4 px-8 py-2  bg-blue-500 rounded-sm text-center text-gray-50">
        Ajoute Tâche
      </button>
    </form>
  );
};

export default TodoForm;
