const mongoose = require('mongoose'); // importamos el paquete

// creamos una función para establecer la conexión

const dbConnection = async () =>{


    try {
          await  mongoose.connect(process.env.BD_CNN);
        
           console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB ver log')
        
    }
   
}

module.exports ={
    dbConnection
}