const express = require('express');

module.exports = function (server) {
  const router = express.Router();
  server.use('/api', router);
  
  const CEPResource = require('../resources/CEPResource');
  router.get('/consultaaps/cep/:cep', CEPResource.get);
}
