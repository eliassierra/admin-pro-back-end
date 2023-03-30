

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


const actualizarHospital =async (req, res = response) => {

  const id = req.params.id;
    const uid = req.params.id;

  try {

    const hospital = await Hospital.findById(id);

    if(!hospital) {
     return res.status(400).json({
      ok: false,
      msg: 'Hospital no encontrado por id'

      })
    }

   const cambiosHospital = {
    ...req.body,
    usuario: uid
   }

   const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true})

    res.json({
      ok: true,
      msg: "actualizarHospital",
     hospital: hospitalActualizado
    });
    
  } catch (error) {

    console,log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
    
  }

}

const borrarHospital = async(req, res = response) =>{

  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id)

    if(!hospital){
      return res.status(400).json({
        ok: false,
        msg: 'Hospital no encontrado por id '
      });
    }

    await Hospital.findByIdAndDelete(id);


    res.json({
      ok: true,
      msg: 'Hospital eliminado'
    });
    
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};