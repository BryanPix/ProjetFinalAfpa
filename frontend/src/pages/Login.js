import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Logo from "../components/mainLogo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="div-login">
      <Logo />
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="********"
          className="text-white bg-transparent border-b-2 w-full outline-none"
        />
        </div>

        {/* Désactiver le bouton en cas de requète pour éviter les requètes simultanées (HEIN Hélène) !!! :D */}
        <button disabled={isLoading} className="btn-login mt-6">
          Se Connecter
        </button>

        {error && <div className="error-message pt-6 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
