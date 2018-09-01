'use strict'
/**
 * Rutas de  acceso a las diversas entradas para la administración web de la aplicación
 */
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");


router.get('/404', function(req, res, next){
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
  });
  
router.get('/403', function(req, res, next){
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
  });
  
  router.get('/500', function(req, res, next){
    // trigger a generic (500) error
    next(new Error('keyboard cat!'));
  });


///Gestión de rutas
//Error 404
  router.use(function(req, res, next){
    res.status(404);

    var data =   {
        title: '404 - Página no encontrada'
    }
    res.format({
      html: function () {
        res.render('404', { url: req.url, layout: 'errors', title:'404 - Página no encontrada' })
      },
      json: function () {
        res.json({ error: 'Not found' })
      },
      default: function () {
        res.type('txt').send('Not found')
      }
    })
  });


  module.exports = router;