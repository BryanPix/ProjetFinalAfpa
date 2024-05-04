const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    // Vérification d'autorisation
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: `Token d'autorisation requis !`})
    }
    // on veut separer le string recuperer en un tableau que l'on va separer(split) par un element trouvé à l'interieur (ici un espace), on souhaite la deuxieme partie de l'array [1]
   const token = authorization.split(' ')[1]

   try {
    // le underscore avant id est inherent à mongodb
    const {_id}= jwt.verify(token, process.env.SECRET)
    // La propriété user est associé à l'objet requète 
    req.user = await User.findOne({ _id }).select('_id');
    next();

    } catch (error) {
    console.log(error)
    res.status(401).json({error: `La requète n'est pas autorisé`})
   }
}

module.exports = requireAuth