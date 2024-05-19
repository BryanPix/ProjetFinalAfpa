const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

// Quand on créer un model, par defaut, il vient avec des methodes comme create ou find ou delete, et on peut créer une methode personalisé
// On utilise bcrypt (librarie npm) pour hash le mot de passe afin de proteger les utilisateurs d'une eventuelle breche de la base de données

// methode statique pour l'inscription
// Quand on veut utiliser le mot clé "this" il faut une fonction normale et non fléchée
userSchema.statics.signup = async function (email, password, name) {
  // Validation à l'aide d'une librairie npm "validator", elle permet d'effectuer les controles sur la presence d'un email ou d'un mot de passe eventuellement puissant (plutôt que de passer par des REGEX)
  
  // Verification des inputs manquants
  if (!email && !password && !name) {
    throw Error("Tous les champs doivent être rempli.");
  }
  if (!email && password && !name) {
    throw Error("Veuillez ajouter un mail et un nom.");
  }
  if (!email && !password && name) {
    throw Error("Veuillez ajouter un mail et un mot de passe.");
  }
  if (email && !password && !name) {
    throw Error("Veuillez ajouter un mot de passe et un nom.");
  }
  if (email && !password && name) {
    throw Error("Veuillez ajouter un mot de passe.");
  }
  if (email && password && !name) {
    throw Error("Veuillez ajouter un nom.");
  }
  if (!email && password && name) {
    throw Error("Veuillez ajouter un mail.");
  }

  // Utilisation de la methode isEmail pour verifier si le champ rempli est un email
  if (email && password && name && !validator.isEmail(email)) {
      throw Error(`L'email n'est pas valide`);
  }
  
  if (!validator.isStrongPassword(password)) {
    throw Error(
      `Le mot de passe doit contenir au moins: 8 charactères, une lettre majuscule, une lettre minuscule, un chiffre, et un charactère spécial. `
    );
  }

  // On cherche à voir si le mail existe
  const exists = await this.findOne({ email });
  // Si oui
  if (exists) {
    throw Error("Email déja utilisé");
  }
  // On créer un salt avec bcrypt pour modifier le mot de passe en un string aléatoire pour ajouter une sécurité supplementaire
  // On utilise await car le salt prend du temps à agir par defaut (Surement pour éviter les attaques brut force);
  // L'argument 10 est là pour désigner le nombre de "round" nécessaire, plus le nombre est haut plus long il est pour le hash (le nombre retourné en hash est plus long)plus long il est pour les utilisateurs pour se connecter donc il faut trouver un juste milieu (la base par defaut est 10)
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // On prend le mot de passe qui est hash pour le conserver dans la base de données avec l'email de l'utilisateur (En noSQL on appelle ça un document pour l'utilisateur)
  // On utilise le mot clé "this" pour se réferer à la methode plus haut "(this.findOne({ email }))"
  const user = await this.create({ email, password: hash, name });
  // Lorsque l'on voudra appeler la fonction "signup", on voudra que celle-ci nous retournes l'utilisateur d'où le "return user"
  return user;
};

// methode statique pour la conection
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Tous les champs doivent être rempli");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email incorrect");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Mot de passe incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
