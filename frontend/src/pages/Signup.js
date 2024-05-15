import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Logo from "../components/mainLogo";

// pour voir le mot de passe
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup, isLoading, error } = useSignup();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, name);
  };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div className="div-signup">
      <Logo />
      <form onSubmit={handleSubmit}>
        <div className="signUp-name mt-4">
          <label className="signup block text-white">Nom: </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Jane"
            className="text-white bg-transparent border-b-2 w-full outline-none"
          />
        </div>
        <div className="signUp-email mt-4">
          <label className="signup block text-white">Email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="JaneDoe@gmail.com"
            className="text-white bg-transparent border-b-2 w-full outline-none"
          />
        </div>
        <div className="signUp-password mt-4">
          <label className="signup block text-white">Mot de passe: </label>
          <input
            type={type}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="*********"
            className="text-white bg-transparent border-b-2 w-full outline-none"
            autoComplete="current-password"
          />
          <span class="flex justify-around items-center" onClick={handleToggle}>
            <Icon class="relative bottom-8 inset-x-36" icon={icon} size={20} />
          </span>
        </div>

        {/* Désactiver le bouton en cas de requète pour éviter les requètes simultanées (HEIN Hélène) !!! :D */}
        <button disabled={isLoading} className="btn-signup mt-1">
          S'inscrire
        </button>
        {error && (
          <div className="error-message pt-12 text-center">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Signup;
