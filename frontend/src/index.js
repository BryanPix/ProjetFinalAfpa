import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ToDoContextProvider } from "./context/toDoContext";
import { CalendarContextProvider } from "./context/calendarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Le context provider permet de ne pas avoir à déclarer à chaque fois le props voulu à chaque niveau de l'app, (sans le context provider, il faudrait par exemple dire au header le main et le footer de prendre le props, grace au context provider on déclare que tout le body en general est affecté par le props, donc gains de perfomances et de temps )  */}
    <AuthContextProvider>
    <ToDoContextProvider>
      <CalendarContextProvider>
      <App />
      </CalendarContextProvider>
    </ToDoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
