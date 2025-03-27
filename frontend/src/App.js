import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// Pages et components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import "./index.css";

// useless commentary to test something can ignore or delete.

function App() {
  const { user } = useAuthContext();

  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" /> }
        />
        <Route 
        path="/login"
        // la route navigate avec un slash permet de naviguer vers le Home, qui est la page principale et la premiere route referencée
        element={!user ? <Login /> : <Navigate to="/" /> }
        />
        <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" /> }
        />
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
