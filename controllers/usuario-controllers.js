const Usuario = require("../models/usuarios");
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


// controlador
const getUsuarios = async (req, res) => {
const desde = Number(req.query.desde) || 0;

const [usuario, totalRegistros] = await Promise.all([
  Usuario.find({}, "nombre email role google img")
  .skip(desde)
  .limit(20),

  Usuario.countDocuments(),
]);

  res.json({
    ok: true,
    usuario,
    // id: req.id,
    totalRegistros
  });
};

// controlador
const crearUsuario = async (req, res = response) => {

const { password, email } = req.body; // Como leer el body


  try {
const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya está registrado",
      });
    }

const usuario = new Usuario(req.body); // Creamos una instancia de Usuario

    // Encriptar contraseña
const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario en bb
    await usuario.save();

    // generar el TOKEN - JWT
const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado... revisar log",
    });
  }
}

const actualizarUsuarios = async (req, res = response) =>{
  // TODO: validar token y comprobar si el usuario es correcto

  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(id);

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontró el usuario por ese ID",
      });
    }

// Actualizaciones
const {password, google, email, ...campos} = req.body;

 if (usuarioDB.email === email) {

  const existeEmail = await Usuario.findOne({ email})
  if(existeEmail){
    return res.status(400).json({
      ok: false,
      msg: 'Ya existe un usuario con este correo'
    })
  }
 }

 campos.email = email;
const usuariActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true});

    res.json({
      ok: true,
      usuario: usuariActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado... revisar log",
    });
  }
};

const borrarUsuario = async (req, res = response) => {

   const id = req.params.id

  try {

    const usuarioID = await Usuario.findById(id)

    if (!usuarioID)
    return res.status(400).json({
      ok: false,
      msg: ('No se encontró un usuario con ese ID')
    });

 await Usuario.findByIdAndDelete(id);

 res.json({
  ok: true,
  msg: 'Usuario eliminado'
 });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "error inesperado... revisar log",
    });
 
  }

};
 
module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuarios,
  borrarUsuario,
};
