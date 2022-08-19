const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id_Pokemon: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: "https://i.postimg.cc/dVRcWjbP/egg-10k.png"
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull:false,

    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull:false,

    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    health:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  });
};
