/*
   patch: /api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {login, googleSingIn, renewToken} = require('../controllers/auth-controller');
const { validarCampos } = require("../middlewares/validar-campos");
 const { validarToken } = require("../middlewares/validar-jwt");

const router = Router();


router.post( '/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos

],
login

)

router.post("/google",
  [
    check("token", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSingIn
);


router.get("/renew", validarToken,
 renewToken
 );

module.exports = router;