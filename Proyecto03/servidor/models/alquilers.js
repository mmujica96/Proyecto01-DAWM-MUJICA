const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alquilers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'alquilers',
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
        name: "clienteId",
        using: "BTREE",
        fields: [
          { name: "clienteId" },
        ]
      },
    ]
  });
};
