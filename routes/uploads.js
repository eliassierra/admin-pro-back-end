/*
   Hospitales
   ruta: /api/uploads/

 */

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");




const { validarToken } = require("../middlewares/validar-jwt");
const { fileUploads, retornaImagen } = require("../controllers/uploads-controller");
const e = require("cors");

const router = Router(); // instancia del Router

router.use(expressFileUpload());

router.put("/:tipo/:id", validarToken, fileUploads);

router.get("/:tipo/:foto", retornaImagen);



module.exports = router;
