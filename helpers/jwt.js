
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const generarJWT = (id) =>{

    return new Promise( (resolve, reject) => {

    const payload = {
      id,
    };

    jwt.sign(payload,process.env.JWT_SECRET, // Firma del json web token 
      {
        expiresIn: "12h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('No se pudo generar el JWT')
        }else {
            resolve (token);
        }
      });

 });

}

module.exports = {
  generarJWT,
};