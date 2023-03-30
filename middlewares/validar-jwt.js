
const jtw = require('jsonwebtoken')

const validarToken = (req, res, next) =>{
  //Leer los Token
  const token = req.header('x-token');
  // Validar token
  if(!token){
    return res.status(401).json({
      ok: false,
      mdg: 'No hay token elnla petición'
    });
  }
// Veriicaar token
  try {
    const { id } = jtw.verify(token, process.env.JWT_SECRET);
    req.id = id;
    
    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'El token no es correcto'
    })
    
  }


}

module.exports = {
    validarToken
}