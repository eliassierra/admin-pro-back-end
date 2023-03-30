
const { response } = require('express'); // tener el tipado
const Usuarios = require("../models/usuarios");
const Hospital = require("../models/hospital");
const Medico = require("../models/medicos");
const usuarios = require('../models/usuarios');


// Controladores
const getBuscarTodo = async (req, res = response)=>{

    try {

        const busqueda = req.params.busqueda;
        const expresionRegular = new RegExp(busqueda, 'i');
        
        const [usuario, hospitales, medicos] = await Promise.all([
          Medico.find({ nombre: expresionRegular }),
          Hospital.find({ nombre: expresionRegular }),
          Usuarios.find({ nombre: expresionRegular }),
        ]);
        res.json({
            ok: true,
            usuario,
            hospitales,
            medicos
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mes: 'error...'
        })
        
    }
}


const getDocumentoColeccion = async (req, res = response) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const expresionRegular = new RegExp(busqueda, "i");

    let data = [];

    switch (tabla) {
      case "medicos":
        data = await Medico.find({ nombre: expresionRegular })
          .populate("hospital", "nombre ")
          .populate("usuario", "nombre ");
        break;

      case "hospital":
        data = await Hospital.find({ nombre: expresionRegular }).populate(
          "usuario",
          "nombre img"
        );
        break;

      case "usuarios":
        data = await Usuarios.find({ nombre: expresionRegular });
        break;

      default:
        return res.status(400).json({
          ok: false,
          msg: "La tabla tiene que ser usuarios/medicos/hospital",
        });
    }
 res.json({
   ok: true,
   resultados: data,
 });
    
};
module.exports = {
  getBuscarTodo,
  getDocumentoColeccion,
}
