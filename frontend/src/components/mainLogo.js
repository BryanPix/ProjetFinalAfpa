import LogoBananaOrganizer from "../images/LogoBananaOrganizer.png";

function Logo() {
  return (
    <div>
      <img
        src={LogoBananaOrganizer}
        alt="Logo Banana Organizer"
        className="MainLogo"
      />
      <p className="slogan text-white">
        Soyez organisé dans votre désorganisation.
      </p>
    </div>
  );
}

export default Logo;
