      // Funciones exportadas
      const { response } = require("express");
const hospital = require("../models/hospital");

      const Medico = require('../models/medicos');

      // Controladores
      const getMedicos = async (req, res = response) => {

        const medicos = await Medico.find()
          .populate("hospital", "nombre ")
          .populate("usuario", "nombre ")


        res.json({
          ok: true,
          medicos
        });
      };

      const crearMedicos = async (req, res = response) => {

        const id = req.id;
        const medico = new Medico({
          usuario: id,
          ...req.body
        });

        try {

          const medicosBD = await medico.save();
          res.json({
            ok: true,
            medico: medicosBD,


          });
        } catch (error) {
          return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
          });
        }
      }



      const actualizarMedicos = async (req, res = response) => {
       
        const id = req.params.id;
        const uid = req.params.id;

        try {

          const medico = await Medico.findById(id);

          if(!medico){
            return res.status(400).json({
              ok: false,
              msg: " Medico no encontrado por id",
            });
          }

           const cambiosMedico = {
             ...req.body,
             usuario: uid,
             
           };

           const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})


           res.json({
             ok: false,
             medico: medicoActualizado
           });

          
        } catch (error) {
          console.log(error)
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administradror'
          })
          
        }
      };
      
      const borrarMedicos = async (req, res = response) => {

        const id = req.params.id;

        try {
          const medico = await Medico.findById(id);

          if(!medico){
            return res.status(400).json({
              ok: false,
              msg: "Medico no encontrado por id",
            });
          }
          await Medico.findByIdAndDelete(id);

          res.json({
            ok: true,
            msg: 'Médico Eliminado'
          });

        } catch (error) {
          console.log(error)
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
          })
          
        }



      };


      module.exports = {
        getMedicos,
        crearMedicos,
        actualizarMedicos,
        borrarMedicos,
      };