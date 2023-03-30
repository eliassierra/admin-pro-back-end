const { Schema, model } = require('mongoose');

//Creamos el esquema
const HospitalSchema = Schema(
  {
    // definimos los campos o propiedades
    nombre: {
      type: String,
      required: true,
    },

    img: {
      type: String,
    },

    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
    },
  },
  { collection: "hospitales" }
);

// Mongo por defecto el id lo coloca _id con guíon, de esta forma lo transformamos
HospitalSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

// Exportamos nuestro modelo
module.exports = model("Hospital", HospitalSchema);