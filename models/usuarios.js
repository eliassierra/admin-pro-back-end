const { Schema, model} = require('mongoose');

//Creamos el esquema
const UsuarioSchema = Schema ({

// definimos los campos o propiedades
    nombre:{
        type: String,
       required: true,

    },
     email:{
        type: String,
        required: true,
        inique: true

    },
     password:{
         type: String,
       required: true

    },
     img:{
        type: String,

    },
    role:{
        type: String,
       required: true,
       default: 'USER_ROLE',

    },
    google:{
        type: Boolean,
        default: false,

    },

});

// Mongo por defecto el id lo coloca _id con guíon, de esta forma lo transformamos
UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Exportamos nuestro modelo
module.exports = model("Usuarios", UsuarioSchema);