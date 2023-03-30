/*
Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt')


const {getUsuarios, crearUsuario, actualizarUsuarios, borrarUsuario} = require('../controllers/usuario-controllers')

const router = Router();
                      // Midelguers
 router.get('/',validarToken, getUsuarios);


 router.post(
   "/",
   [
     check("nombre", "El nombre es obligatorio").not().isEmpty(),
     check("password", "El password es obligatorio").not().isEmpty(),
     check("email", "El email es obligatorio").isEmail(),
     validarCampos,
   ],
   crearUsuario
 );
router.put( "/:id",
  [
    validarToken,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  actualizarUsuarios
);

router.delete("/:id", 
validarToken,
borrarUsuario

)


 module.exports = router;