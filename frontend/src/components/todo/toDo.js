import { useEffect } from "react";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import TodoForm from "./toDoForm";
import ToDoDetails from "./toDoDetails";

const Todo = () => {
  const { toDoList, dispatch } = useToDoContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchToDo = async () => {
      const response = await fetch("/api/toDoList", {
        headers:  {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODO", payload: json });
      }
    };

    if (user){
      fetchToDo();
    }
  }, [dispatch, user]);

  return (
    
      <div className="todolist mb-9">
        <TodoForm />
        {toDoList &&
          toDoList.map((toDo) => <ToDoDetails key={toDo._id} tache={toDo} />)}
      </div>
  
  );
};

export default Todo;
