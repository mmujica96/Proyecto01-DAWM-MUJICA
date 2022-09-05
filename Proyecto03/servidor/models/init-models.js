var DataTypes = require("sequelize").DataTypes;
var _alquiler_detalles = require("./alquiler_detalles");
var _alquilers = require("./alquilers");
var _clientes = require("./clientes");
var _peliculas = require("./peliculas");
var _sequelizemeta = require("./sequelizemeta");

function initModels(sequelize) {
  var alquiler_detalles = _alquiler_detalles(sequelize, DataTypes);
  var alquilers = _alquilers(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var peliculas = _peliculas(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);

  alquiler_detalles.belongsTo(alquilers, { as: "alquiler", foreignKey: "alquilerId"});
  alquilers.hasMany(alquiler_detalles, { as: "alquiler_detalles", foreignKey: "alquilerId"});
  alquilers.belongsTo(clientes, { as: "cliente", foreignKey: "clienteId"});
  clientes.hasMany(alquilers, { as: "alquilers", foreignKey: "clienteId"});
  alquiler_detalles.belongsTo(peliculas, { as: "pelicula", foreignKey: "peliculaId"});
  peliculas.hasMany(alquiler_detalles, { as: "alquiler_detalles", foreignKey: "peliculaId"});

  return {
    alquiler_detalles,
    alquilers,
    clientes,
    peliculas,
    sequelizemeta,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
