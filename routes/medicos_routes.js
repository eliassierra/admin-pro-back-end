        /*
          Medicos
          ruta: /api/medicos

        */

        const { Router } = require("express");
        const { check } = require("express-validator");

        const {
          getMedicos,
          crearMedicos,
          actualizarMedicos,
          borrarMedicos,
        } = require("../controllers/medicos-controller");
        const { validarCampos } = require("../middlewares/validar-campos");
        const { validarToken } = require("../middlewares/validar-jwt");

        const router = Router();
        // Midelguers
        router.get("/", getMedicos);

        router.post(
          "/",
          [
            validarToken,
            check("nombre", "El nombre del médico es necesario").not().isEmpty(),
            check("hospital", "El hospital id debe ser valido").isMongoId(), //validamos que sea un id de mongo
            validarCampos
          ],
          crearMedicos
        );

        router.put("/:id", 
        [], 
        actualizarMedicos);

        router.delete("/:id", borrarMedicos);

        module.exports = router;
