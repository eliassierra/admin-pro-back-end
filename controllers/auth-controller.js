
const Usuario = require("../models/usuarios");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const { email, password } = req.body; // extraemos el email y el password del body


    try {
        // Verificar email
           const usuarioDB = await Usuario.findOne({ email });

           if (!usuarioDB) {
             return res.status(400).json({
               ok: false,
               msg: "El email nose encuentra ",
             });
           }
        // // Verificar contraseña
         const validarPassword = bcrypt.compareSync(password, usuarioDB.password); // comparamos los password
         if ( !validarPassword ){
             return res.status(400).json({
               ok: false,
               msg: 'La contraseña no es valda'
             });    
         }


        // generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}


const googleSingIn = async(req, res = response) =>{

    try {
             const {email, name, picture} = await googleVerify(req.body.token);
            // Validamos si el usuario existe
             const usuarioDB = await Usuario.findOne({ email });
             let usuario;
             // Si el usuario no existe !
             if(!usuarioDB){
               // Creamos el usuario si no existe
               usuario = new Usuario({
                 nombre: name,
                 email,
                 password: "@@@",
                 img: picture,
                 google: true,
               })
             } else{
                usuario = usuarioDB;
                usuario.google = true;
             }
             //Guardamos  usuario en bs
             await usuario.save();

             // Generar el TOKEN - JWT
             const token = await generarJWT(usuario.id);
             res.json({
                ok: true,
                email, name, picture,
               token
             })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        })  
    }
}


module.exports = {
  login,
  googleSingIn,
};