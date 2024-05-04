// on utilise le model pour interagir avec les requetes GET POST DELETE UPDATE ect..
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// on créer une fonction pour pouvoir la réutiliser à l'interieur des fonctions loginUser et signupUser
// on passe comme argument _id car il fait parti du payload du token (il va utiliser l'id pour faire les verifications)
// un token est composé de trois parties (le header, le payload et la signature) le header permet d'avoir l'algo pour resolve le token, le payload sont les infos en format JSON non-sensible de l'utilisateur(pour verif son identité) et la signature permet de verifier si le token est relatif à la bonne personne(un utilisateur B ne pourra pas utiliser le token d'un utilisateur A pour se connecter ou s'inscrire)
const createToken = (_id) => {
  // normalement on passe {_id: _id} mais puisque les noms sont les mêmes on peut raccourcir
  // on peut passer d'autre choses si on veut mais pas d'information sensible
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// connection Utilisateur

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // creation token
    const token = createToken(user._id);

    // name: user.name permet de récuperer le nom de l'utilisateur (c'était galère à trouver j'ai encore besoin d'entrainement)
    res.status(200).json({ email, token, name: user.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Inscription Utilisateur

const signupUser = async (req, res) => {
  // la destructuration à partir d'un objet se fait grace à des accolades
  const { email, password, name } = req.body;

  // On utilise un try and catch pour pouvoir "catch" une eventuelle erreure

  try {
    // On try de se connecter donc on appelle le model User avec la fonction signup que l'on à créee
    const user = await User.signup(email, password, name);

    // creation token
    const token = createToken(user._id);

    // Si aucune erreur n'est retournée, on aura l'utilisateur car dans le fichier userModel on a le return user à la fin de la méthode statique
    // On retoure un status 200 (ok) et en format json on retourne l'email de l'utilisateur et l'objet user (qui est le nouveau document crée dans mongoDB) et le nom
    res.status(200).json({ email, token, name });
  } catch (error) {
    // L'erreur retournée peut être soit celle du userModel "Email déja utilisé" soit une erreur de mongoose pour signifié que le schema n'est pas respecté par exemple
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
