const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     /*  validate: {
        isAlpha: {//personalizo el mensaje
          args: true,
          msg: "the name can only contain letters"
        }, 
        len: {//longitud minimo y maximo del nombre
          args: [3, 200],
          msg: "the name contain between 3 and 200 characters"
        },
      } */
    },
  }, {
    timestamps: false
});
};