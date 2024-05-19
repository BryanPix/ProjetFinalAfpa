import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Logo from "../components/mainLogo";
import Navbar from "../components/Navbar";
import '../styles/loginSignup.css'

// pour voir le mot de passe
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  // visibilité mot de passe
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const getPasswordType = () => {
    return passwordVisible ? "text" : "password";
  };

  const getPasswordIcon = () => {
    return passwordVisible ? eye : eyeOff;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <Logo />
    <div className="div-login">
      <p className="connexionSide">Connexion</p>
      <form onSubmit={handleSubmit}>
        <div className="login-email mt-6">
          <label className="login text-white">Email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="JaneDoe@gmail.com"
            className="text-white bg-transparent border-b-2 w-full outline-none"
          />
        </div>
        <div className="login-password mt-4">
          <label className="login text-white">Mot de passe: </label>
          <input
            type={getPasswordType("password")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="********"
            className="text-white bg-transparent border-b-2 w-full outline-none"
          />
          <span
            className="flex justify-around items-center"
            onClick={handleTogglePassword}
          >
            <Icon
              className="eyeIcon relative bottom-8 inset-x-36 "
              icon={getPasswordIcon("password")}
              size={20}
            />
          </span>
        </div>

        {/* Désactiver le bouton en cas de requète pour éviter les requètes simultanées (HEIN Hélène) !!! :D */}
        <button disabled={isLoading} className="btn-login mt-6">
          Se Connecter
        </button>

        {error && <div className="error-message pt-6 text-center">{error}</div>}
      </form>
      <Navbar /> 
    </div>
    </div>
  );
};

export default Login;
