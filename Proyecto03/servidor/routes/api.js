var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/peliculas', function(req, res, next) {  
  models.peliculas.findAll()
 .then(peliculas => {
    res.json(peliculas)
 })
 .catch(error => res.status(400).send(error))
});

router.get('/peliculas/:id', function(req, res, next) {
    models.peliculas.findOne( { where :{ id: req.params.id}})
    .then(peliculas => {
        res.json(peliculas)
    }).catch((err) => {
        res.status(400).send(error)
    });
  });

router.get('/alquiler', function(req, res, next) {  
  models.alquiler_detalles.findAll()
 .then(alquiler => {
    res.json(alquiler)
 })
 .catch(error => res.status(400).send(error))
});


router.get('/clientes', function(req, res, next) {  
    models.clientes.findAll()
   .then(clientes => {
      res.json(clientes)
   })
   .catch(error => res.status(400).send(error))
  });


module.exports = router;