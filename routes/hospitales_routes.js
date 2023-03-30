/*
   Hospitales
   ruta: '/api/hospitales'

 */

   const { Router } = require("express");
   const { check } = require("express-validator");
   const { validarCampos } = require("../middlewares/validar-campos");
   const { validarToken } = require("../middlewares/validar-jwt");

   const {
     getHospitales,
     crearHospital,
     actualizarHospital,
     borrarHospital,
   } = require('../controllers/hospitales-controller');


   const router = Router();
   // Midelguers
   router.get('/', getHospitales);


   router.post(
     "/",
     [
       validarToken,
       check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
       validarCampos,
     ],
     crearHospital // llamamos el metodo crearHospital
   ); 


   router.put(
     "/:id",
     [
       validarToken,
       check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
       validarCampos
     ],
     actualizarHospital // llamamos el metodo
   );

   router.delete('/:id',
   validarToken,
    borrarHospital);

   module.exports = router;