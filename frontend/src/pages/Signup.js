import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, name);
  };

  return (
    <div className="Login  md:flex md:justify-center">
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="text-center text-4xl mb-8 text-white font-bold">Inscription</h3>
      <div className="block mb-8 mx-4">
        <label className="font-bold text-white">Nom: </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Jane"
          className="appearance-none bg-transparent border-b border-white text-white"
        />
      </div>
      <div className="block mb-8 mx-4">
        <label className="font-bold text-white">Email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="JaneDoe@gmail.com"
          className="appearance-none bg-transparent border-b border-white text-white"
        />
      </div>
      <div className="block mx-4">
        <label className="font-bold text-white">Mot de passe: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="*********"
          className="appearance-none bg-transparent border-b border-white text-white"
        />
      </div>

      {/* Désactiver le bouton en cas de requète pour éviter les requètes simultanées (HEIN Hélène) !!! :D */}
      <button disabled={isLoading} className="btn-signup bg-green-500 font-bold rounded-lg text-gray-50 py-3 px-4 relative mx-0 w-9/12 inset-52 inset-x-10 text-center">S'inscrire</button>
      {error && <div className="error w-9/12 border-2 border-red-500 text-red-500 text-center mx-9">{error}</div>}
    </form>
    </div>

  );
};

export default Signup;
