const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
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
        isAlpha: {
          args: true,
          msg: "the name can only contain letters"
        }, 
        len: {
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
      
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    createdAtDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: true, 
    }
  }, {
      timestamps: false
  });
};
