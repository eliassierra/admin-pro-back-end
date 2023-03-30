const { Schema, model } = require("mongoose");

//Creamos el esquema
const MedicoSchema = Schema({
  // definimos los campos o propiedades
  nombre: {
    type: String,
    required: true,
  },

  img: {
    type: String,
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
});

// Mongo por defecto el id lo coloca _id con guíon, de esta forma lo transformamos
MedicoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Exportamos nuestro modelo
module.exports = model("Medico", MedicoSchema);
