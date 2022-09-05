const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alquiler_detalles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    alquilerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'alquilers',
        key: 'id'
      }
    },
    peliculaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'peliculas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'alquiler_detalles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "alquilerId",
        using: "BTREE",
        fields: [
          { name: "alquilerId" },
        ]
      },
      {
        name: "peliculaId",
        using: "BTREE",
        fields: [
          { name: "peliculaId" },
        ]
      },
    ]
  });
};
