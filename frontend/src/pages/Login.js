import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (

    <div className="login md:flex md:justify-center">

    <form onSubmit={handleSubmit}>
      <h3 className="text-center text-4xl mb-6 text-white font-bold">Connexion</h3>
      <div className="  block mb-8 mx-4">
        <label className=" login font-bold text-white">Email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="JaneDoe@gmail.com"
          className="appearance-none bg-transparent border-b border-white text-white mb-4"
        />
      </div>
      <div className=" block mb-8 mx-4">
        <label className=" login font-bold text-white">Mot de passe: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="********"
          className="appearance-none bg-transparent border-b border-white text-white"
        />
      </div>

      {/* Désactiver le bouton en cas de requète pour éviter les requètes simultanées (HEIN Hélène) !!! :D */}
      <button disabled={isLoading} className="btn-login bg-green-500 font-bold rounded-lg text-gray-50 py-3 px-4 relative mx-0 w-9/12 inset-52 inset-x-10 text-center">Se Connecter</button>

      {error && <div className="error w-9/12 border-2 border-red-500 text-red-500 text-center mx-9">{error}</div>}
    </form>
    </div>

  );
};

export default Login;
