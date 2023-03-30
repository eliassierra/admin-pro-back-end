
/*
   Hospitales
   ruta: /api/buscar

 */

   const { Router } = require("express");
   const router = Router(); // instancia del Router

   const { validarToken } = require("../middlewares/validar-jwt");
   const { getBuscarTodo, getDocumentoColeccion } = require("../controllers/busquedas-controller");
  
   // Midelguers
   router.get( "/:busqueda", validarToken, getBuscarTodo);

   router.get('/coleccion/:tabla/:busqueda', validarToken, getDocumentoColeccion);

   module.exports = router;