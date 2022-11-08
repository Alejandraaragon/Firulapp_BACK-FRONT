const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,          
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: {//personalizo el mensaje
          args: true,
          msg: "the name can only contain letters"
        }, 
        len: {//longitud minimo y maximo del nombre
          args: [3, 100],
          msg: "the name contain between 3 and 200 characters"
        },
      }
    },

    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
      /* validate: {
        min: 0,
        max: 25,//años
      } */
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    createdAtDb: {//con esto hacemos el filtro creados en database
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: true, 
    }
  }, {
      timestamps: false
  });
};
