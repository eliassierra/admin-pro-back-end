      // Funciones exportadas
      const { response } = require("express");

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



      const actualizarMedicos = (req, res = response) => {
        res.json({
          ok: false,
          msg: "actualizarMedicos",
        });
      };

      const borrarMedicos = (req, res = response) => {
        res.json({
          ok: true,
          msg: "borrarMedicos",
        });
      };


      module.exports = {
        getMedicos,
        crearMedicos,
        actualizarMedicos,
        borrarMedicos,
      };