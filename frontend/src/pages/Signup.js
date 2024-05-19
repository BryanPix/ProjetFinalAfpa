import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Logo from "../components/mainLogo";
import Navbar from "../components/Navbar";

// pour voir le mot de passe
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { signup, isLoading, error } = useSignup();

  // visibilité mot de passe
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const getPasswordType = (field) => {
    return field === "password"
      ? passwordVisible
        ? "text"
        : "password"
      : confirmPasswordVisible
      ? "text"
      : "password";
  };

  const getPasswordIcon = (field) => {
    return field === "password"
      ? passwordVisible
        ? eye
        : eyeOff
      : confirmPasswordVisible
      ? eye
      : eyeOff;
  };

  const handleToggleConfirm = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, name);
  };
  return (
    <div>
      <Logo />
    <div className="div-signup">
    <p className="connexionSide">Inscription</p>
      <form onSubmit={handleSubmit}>
        <div className="signUp-name mt-4">
          <label className="signup block text-white">Prénom: </label>
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
            type={getPasswordType("password")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="*********"
            className="text-white bg-transparent border-b-2 w-full outline-none"
            autoComplete="current-password"
          />
          <span
            className="flex justify-around items-center"
            onClick={handleTogglePassword}
          >
            <Icon
              className=" eyeIcon relative bottom-8 inset-x-36"
              icon={getPasswordIcon("password")}
              size={20}
            />
          </span>
        </div>
        <div className="confiirm-password mt-4">
          <label className="signup block text-white">
            Confirmation mot de passe:{" "}
          </label>
          <input
            type={getPasswordType("confirmPassword")}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="*********"
            className="text-white bg-transparent border-b-2 w-full outline-none"
          />
          <span
            className="flex justify-around items-center"
            onClick={handleToggleConfirm}
          >
            <Icon
              className=" eyeIcon relative bottom-8 inset-x-36"
              icon={getPasswordIcon("confirmPassword")}
              size={20}
            />
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
    <Navbar /> 
    </div>
    </div>
  );
};

export default Signup;
