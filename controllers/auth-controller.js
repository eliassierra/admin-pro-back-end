
const Usuario = require("../models/usuarios");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


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


module.exports = {
    login
}