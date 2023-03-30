
const path = require('path');
const fs = require('fs')

const {response} = require('express');
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require('../helpers/actualiza-imagen');



const fileUploads = (req, res = response) =>{

  const tipo = req.params.tipo;
  const id = req.params.id;

  // Validar tipo
  const tiposValidos = ['hospitales','medicos','usuarios'];
  if(!tiposValidos.includes(tipo)){
    return res.status(400).json({
      ok: false,
      msg: "No es un médico, usuario u hospital (tipo)",
    });
  }

  // Validar que exista una imagen
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok: false,
        msg: 'No hay ningún archivo'
    });
  }

// Procesar la imagen
const file = req.files.imagen;

const nombreCortado = file.name.split('.');
const extencionArchivo = nombreCortado[nombreCortado.length -1];

//Validar extensión

const extensionesValidas = ['png','jpg','jpeg','gif'];
 if(!extensionesValidas.includes(extencionArchivo)){
    return res.status(400).json({
        ok: false,
        msg: 'El formado de la imagen no es correcto'
    })
 }

 //Generar el nombre del archivo
 const nombreArchivo = `${uuidv4() }.${ extencionArchivo}`;

 //Path para guardar la imagen
 const path = `./uploads/${ tipo }/${ nombreArchivo }`;

 // Mover la imagen
 file.mv( path, (error) => {
   if (error) {
     console.log(error);
     return res.status(500).json({
       ok: false,
       msg: "Error al mover la imagen",
     });
   }

// Actualiza bd 

actualizarImagen(tipo, id, nombreArchivo);

   res.json({
     ok: true,
     msg: "Archivo subido",
     nombreArchivo
   });
 });

}


const retornaImagen = (req, res = response ) =>{
   const tipo = req.params.tipo;
   const foto = req.params.foto;

   const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

  // Imagen por defecto
  if(fs.existsSync (pathImg)) {
   res.sendFile(pathImg);
  } else{
       const pathImg = path.join(__dirname, `../uploads/no-img.png`);
       res.sendFile(pathImg);
  }


}




module.exports = {
  fileUploads,
  retornaImagen
};
