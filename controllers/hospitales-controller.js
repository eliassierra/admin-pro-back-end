

// Funciones exportadas
const {response} = require('express');

const Hospital = require('../models/hospital');


// Controladores
const getHospitales = async (req, res = response) =>{

  const hospitales = await Hospital.find().populate("usuario", "nombre img");

    res.json({
      ok: true,
      hospitales,
    });

}

const crearHospital = async (req, res = response) =>{

   const id = req.id;
    const hospital = new Hospital ({
      usuario: id,
      ...req.body});
 

    try {
     const hospitaBD = await hospital.save();
      
      res.json({
        ok: true,
        hospital: hospitaBD,
      })

    } catch (error) {
      return res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
      })
      
    }
}


const actualizarHospital = (req, res = response) => {

    res.json({
      ok: false,
      msg: "actualizarHospital",
    });
}

const borrarHospital = (req, res = response) =>{

    res.json({
      ok: true,
      msg: "borrarHospital",
    });
}
 


module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};